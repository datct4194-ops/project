from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.routes.course import router as course_router
from app.routes.quizzes import router as quizzes_router
from app.routes.ai_marking import router as ai_marking_router
from app.routes.dashboard import router as dashboard_router
from app.routes import auth, course, dashboard
from app.database import Base, engine
from app.models import user

Base.metadata.create_all(bind=engine)


app = FastAPI(title="IGCSE Learning Hub")

app.include_router(auth_router)
app.include_router(course_router)
app.include_router(quizzes_router)
app.include_router(ai_marking_router)
app.include_router(dashboard_router)
