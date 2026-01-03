from flask import render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user

from . import lms_bp
from ..extensions import db
from ..models import Topic, Question, Attempt, User
from .services import get_weakest_topics_for_user

def roles_required(*roles):
    def decorator(fn):
        def wrapper(*args, **kwargs):
            if not current_user.is_authenticated:
                return redirect(url_for("auth.login"))
            if current_user.role not in roles:
                flash("Bạn không có quyền truy cập trang này.")
                return redirect(url_for("main.dashboard"))
            return fn(*args, **kwargs)
        wrapper.__name__ = fn.__name__
        return wrapper
    return decorator

@lms_bp.route("/topics")
@login_required
def topics():
    topics = Topic.query.all()
    weakest = get_weakest_topics_for_user(current_user.id, limit=3)
    return render_template("topics.html", topics=topics, weakest=weakest)

@lms_bp.route("/topics/<int:topic_id>", methods=["GET", "POST"])
@login_required
def topic_detail(topic_id):
    topic = Topic.query.get_or_404(topic_id)

    # MVP: lấy 1 câu hỏi đầu tiên (sau này đổi thành chọn theo personalization)
    question = Question.query.filter_by(topic_id=topic.id).first()

    if request.method == "POST" and question:
        chosen = request.form.get("choice")
        is_correct = (chosen == question.correct_choice)

        attempt = Attempt(
            user_id=current_user.id,
            question_id=question.id,
            chosen_choice=chosen,
            is_correct=is_correct,
        )
        db.session.add(attempt)
        db.session.commit()

        flash("Đúng!" if is_correct else "Sai, thử lại nhé.")
        return redirect(url_for("lms.topic_detail", topic_id=topic.id))

    return render_template("topic_detail.html", topic=topic, question=question)

@lms_bp.route("/admin/users")
@login_required
@roles_required("admin", "manager")
def admin_users():
    users = User.query.order_by(User.id.desc()).all()
    return render_template("admin_users.html", users=users)
