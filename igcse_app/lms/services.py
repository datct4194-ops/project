from sqlalchemy import func
from ..models import Attempt, Question, Topic
from ..extensions import db

def get_weakest_topics_for_user(user_id: int, limit: int = 3):
    """
    Rule-based personalization:
    accuracy per topic = correct / total attempts.
    Return lowest-accuracy topics first.
    """
    rows = (
        db.session.query(
            Topic.id,
            Topic.name,
            func.count(Attempt.id).label("attempts"),
            func.sum(func.case((Attempt.is_correct == True, 1), else_=0)).label("correct"),
        )
        .join(Question, Question.topic_id == Topic.id)
        .join(Attempt, Attempt.question_id == Question.id)
        .filter(Attempt.user_id == user_id)
        .group_by(Topic.id, Topic.name)
        .all()
    )

    scored = []
    for tid, name, attempts, correct in rows:
        attempts = int(attempts or 0)
        correct = int(correct or 0)
        acc = (correct / attempts) if attempts else 0.0
        scored.append((acc, tid, name, attempts, correct))

    scored.sort(key=lambda x: x[0])  # weakest first
    return scored[:limit]
