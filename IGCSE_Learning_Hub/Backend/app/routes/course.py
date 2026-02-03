from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
import sqlite3
from pathlib import Path
from app.utils.permissions import role_required

DB_PATH = Path(__file__).resolve().parent.parent / "db" / "igcse.db"
router = APIRouter(prefix="/courses", tags=["Courses"])


class CourseCreate(BaseModel):
    title: str
    description: str


class CourseUpdate(BaseModel):
    title: str
    description: str
@router.post("/")
def create_course(
    data: CourseCreate,
    user=Depends(role_required(["teacher", "manager"]))
):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO courses (title, description, teacher_id) VALUES (?, ?, ?)",
        (data.title, data.description, user["user_id"])
    )

    conn.commit()
    conn.close()

    return {"message": "Course created"}
@router.get("/")
def get_all_courses():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("SELECT id, title, description FROM courses")
    courses = cursor.fetchall()
    conn.close()

    return [
        {
            "id": c[0],
            "title": c[1],
            "description": c[2]
        } for c in courses
    ]
@router.put("/{course_id}")
def update_course(
    course_id: int,
    data: CourseUpdate,
    user=Depends(role_required(["teacher", "manager"]))
):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute(
        "SELECT teacher_id FROM courses WHERE id = ?",
        (course_id,)
    )
    owner = cursor.fetchone()

    if not owner or owner[0] != user["user_id"]:
        raise HTTPException(status_code=403, detail="Not allowed")

    cursor.execute(
        "UPDATE courses SET title = ?, description = ? WHERE id = ?",
        (data.title, data.description, course_id)
    )

    conn.commit()
    conn.close()

    return {"message": "Course updated"}
@router.delete("/{course_id}")
def delete_course(
    course_id: int,
    user=Depends(role_required(["teacher", "manager"]))
):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute(
        "SELECT teacher_id FROM courses WHERE id = ?",
        (course_id,)
    )
    owner = cursor.fetchone()

    if not owner or owner[0] != user["user_id"]:
        raise HTTPException(status_code=403, detail="Not allowed")

    cursor.execute("DELETE FROM courses WHERE id = ?", (course_id,))
    conn.commit()
    conn.close()

    return {"message": "Course deleted"}
