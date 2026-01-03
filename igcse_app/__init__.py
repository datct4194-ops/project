import os
from flask import Flask
from dotenv import load_dotenv

from .extensions import db, login_manager

load_dotenv()

def create_app():
    app = Flask(__name__, template_folder="../templates", static_folder="../static")

    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DATABASE_URL",
        "sqlite:///igcse_learning_hub.db"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)  # init SQLAlchemy with app [web:21]
    login_manager.init_app(app)
    login_manager.login_view = "auth.login"

    from .models import User  # noqa

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    from .auth import auth_bp
    from .main import main_bp
    from .lms import lms_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(lms_bp, url_prefix="/lms")

    with app.app_context():
        db.create_all()  # create tables if not exist [web:21]
        _seed_default_data()

    return app

def _seed_default_data():
    """Seed minimal roles/users/topics for first run."""
    from werkzeug.security import generate_password_hash
    from .models import User, Topic
    from .extensions import db

    # Admin user
    if not User.query.filter_by(username="admin").first():
        admin = User(
            username="admin",
            password_hash=generate_password_hash("admin123"),
            role="admin",
            full_name="System Admin"
        )
        db.session.add(admin)

    # Manager user
    if not User.query.filter_by(username="manager").first():
        manager = User(
            username="manager",
            password_hash=generate_password_hash("manager123"),
            role="manager",
            full_name="System Manager"
        )
        db.session.add(manager)

    # Sample topics
    if Topic.query.count() == 0:
        db.session.add(Topic(name="Algebra", description="Expressions, equations, inequalities.", level="Core"))
        db.session.add(Topic(name="Geometry", description="Angles, shapes, similarity.", level="Core"))
        db.session.add(Topic(name="Functions", description="Graphs and function concepts.", level="Extended"))

    db.session.commit()
