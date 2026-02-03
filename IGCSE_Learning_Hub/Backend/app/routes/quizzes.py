from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import sqlite3
from typing import List
from app.core.config import DB_PATH
from app.routes.ai_marking import mark_essay
from fastapi import Depends
from app.core.deps import get_current_user


router = APIRouter(prefix="/quizzes", tags=["Quizzes"])
class AnswerSubmit(BaseModel):
    question_id: int
    answer: str

class SubmitRequest(BaseModel):
    answers: List[AnswerSubmit]
class Answer(BaseModel):
    question_id: int
    answer: str

class SubmitRequest(BaseModel):
    answers: list[Answer]
def save_submission(user_id, quiz_id, total_score):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO submissions (user_id, quiz_id, total_score) VALUES (?, ?, ?)",
        (user_id, quiz_id, total_score)
    )

    submission_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return submission_id
def save_answer(submission_id, question_id, answer, score, feedback):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute(
        """INSERT INTO answers 
        (submission_id, question_id, student_answer, score, feedback)
        VALUES (?, ?, ?, ?, ?)""",
        (submission_id, question_id, answer, score, feedback)
    )

    conn.commit()
    conn.close()
def get_question(question_id: int):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id, type, correct_answer, marks FROM questions WHERE id = ?",
        (question_id,)
    )
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Question not found")

    return {
        "id": row[0],
        "type": row[1],
        "correct_answer": row[2],
        "marks": row[3]
    }
@router.post("/quiz/{quiz_id}/submit")
def submit_quiz(
    quiz_id: int,
    data: SubmitRequest,
    user=Depends(get_current_user)
):
    total_score = 0
    answers_result = []

    for ans in data.answers:
        q = get_question(ans.question_id)

        if q["type"] == "mcq":
            score = q["marks"] if ans.answer == q["correct_answer"] else 0
            feedback = None
        else:  # essay
            result = mark_essay(
                ans.answer,
                q["correct_answer"],
                q["marks"]
            )
            score = result["score"]
            feedback = result["feedback"]


        total_score += score

        answers_result.append({
            "question_id": ans.question_id,
            "answer": ans.answer,
            "score": score,
            "feedback": feedback
        })

    submission_id = save_submission(user["id"], quiz_id, total_score)

    for a in answers_result:
        save_answer(
            submission_id,
            a["question_id"],
            a["answer"],
            a["score"],
            a["feedback"]
        )

    return {
        "submission_id": submission_id,
        "total_score": total_score
    }

@router.get("/{quiz_id}")
def get_quiz(quiz_id: int):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id, title FROM quizzes WHERE id = ?",
        (quiz_id,)
    )
    quiz = cursor.fetchone()

    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    cursor.execute(
        "SELECT id, question FROM questions WHERE quiz_id = ?",
        (quiz_id,)
    )
    questions = cursor.fetchall()

    conn.close()

    return {
        "quiz_id": quiz[0],
        "title": quiz[1],
        "questions": [
            {"id": q[0], "question": q[1]}
            for q in questions
        ]
    }
