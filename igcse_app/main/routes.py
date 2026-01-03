from flask import render_template
from flask_login import login_required, current_user

from . import main_bp
from ..models import Attempt, Topic

@main_bp.route("/")
def index():
    return render_template("index.html")

@main_bp.route("/dashboard")
@login_required
def dashboard():
    total = Attempt.query.filter_by(user_id=current_user.id).count()
    correct = Attempt.query.filter_by(user_id=current_user.id, is_correct=True).count()
    accuracy = round((correct * 100 / total), 1) if total else 0.0

    topics = Topic.query.all()
    return render_template(
        "dashboard.html",
        user=current_user,
        total_attempts=total,
        accuracy=accuracy,
        topics=topics,
    )
