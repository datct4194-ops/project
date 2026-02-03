from pydantic import BaseModel

class QuizSubmit(BaseModel):
    student_id: int
    answers: dict
