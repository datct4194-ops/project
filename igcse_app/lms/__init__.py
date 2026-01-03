from flask import Blueprint
lms_bp = Blueprint("lms", __name__)
from . import routes  # noqa
