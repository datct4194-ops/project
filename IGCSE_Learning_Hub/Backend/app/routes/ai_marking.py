import openai
from app.core.config import OPENAI_API_KEY
from fastapi import APIRouter

router = APIRouter(prefix="/ai", tags=["AI Marking"])
openai.api_key = OPENAI_API_KEY
def mark_essay(student_answer: str, model_answer: str, max_score: int):
    prompt = f"""
You are an IGCSE examiner.

Model answer:
{model_answer}

Student answer:
{student_answer}

Mark the answer from 0 to {max_score}.
Return ONLY valid JSON like:
{{
  "score": number,
  "feedback": "short feedback"
}}
"""

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a strict examiner."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    import json
    result = json.loads(response.choices[0].message.content)

    return result
@router.post("/mark-essay")
def mark_essay(student_answer: str, model_answer: str, marks: int):
    """
    Demo AI marking (fake AI – sau này thay OpenAI)
    """

    # ---- DEMO LOGIC ----
    similarity = 0.75  # giả lập AI hiểu 75%
    score = round(marks * similarity, 1)

    feedback = "Good understanding but missing some key points."

    return {
        "score": score,
        "feedback": feedback
    }
