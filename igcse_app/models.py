from datetime import datetime
from flask_login import UserMixin
from .extensions import db

ROLES = ("student", "teacher", "parent", "admin", "manager")

class User(UserMixin, db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    role = db.Column(db.String(20), nullable=False, default="student")
    full_name = db.Column(db.String(120), nullable=True)

    # for parent-student link (MVP: optional)
    child_student_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    child_student = db.relationship("User", remote_side=[id])

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def has_role(self, *roles):
        return self.role in roles

class Topic(db.Model):
    __tablename__ = "topics"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    level = db.Column(db.String(20), default="Core")  # Core/Extended
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Question(db.Model):
    __tablename__ = "questions"

    id = db.Column(db.Integer, primary_key=True)
    topic_id = db.Column(db.Integer, db.ForeignKey("topics.id"), nullable=False)

    text = db.Column(db.Text, nullable=False)
    choice_a = db.Column(db.String(255), nullable=True)
    choice_b = db.Column(db.String(255), nullable=True)
    choice_c = db.Column(db.String(255), nullable=True)
    choice_d = db.Column(db.String(255), nullable=True)
    correct_choice = db.Column(db.String(1), nullable=False)  # A/B/C/D
    difficulty = db.Column(db.String(20), default="medium")

    topic = db.relationship("Topic", backref="questions")

class Attempt(db.Model):
    __tablename__ = "attempts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey("questions.id"), nullable=False)

    chosen_choice = db.Column(db.String(1), nullable=True)
    is_correct = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", backref="attempts")
    question = db.relationship("Question", backref="attempts")
