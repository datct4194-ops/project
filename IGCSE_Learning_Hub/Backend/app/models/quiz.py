from sqlalchemy import Column, Integer, JSON
from app.database import Base

class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(Integer, primary_key=True)
    questions = Column(JSON)
