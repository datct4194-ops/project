from flask import render_template, request, redirect, url_for, flash
from flask_login import login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash

from . import auth_bp
from ..extensions import db
from ..models import User, ROLES

@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")

        user = User.query.filter_by(username=username).first()
        if not user or not check_password_hash(user.password_hash, password):
            flash("Sai tài khoản hoặc mật khẩu.")
            return redirect(url_for("auth.login"))

        login_user(user)
        return redirect(url_for("main.dashboard"))

    return render_template("login.html")

@auth_bp.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        full_name = request.form.get("full_name", "").strip()
        role = request.form.get("role", "student").strip()
        password = request.form.get("password", "")

        if role not in ROLES:
            flash("Role không hợp lệ.")
            return redirect(url_for("auth.register"))

        if User.query.filter_by(username=username).first():
            flash("Username đã tồn tại.")
            return redirect(url_for("auth.register"))

        user = User(
            username=username,
            full_name=full_name,
            role=role,
            password_hash=generate_password_hash(password),
        )
        db.session.add(user)
        db.session.commit()

        flash("Đăng ký thành công, hãy đăng nhập.")
        return redirect(url_for("auth.login"))

    return render_template("register.html", roles=ROLES)

@auth_bp.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("main.index"))
