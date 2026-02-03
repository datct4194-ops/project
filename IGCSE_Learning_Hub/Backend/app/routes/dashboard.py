from fastapi import APIRouter, Depends
from app.utils.permissions import role_required

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/student")
def student_dashboard(
    user=Depends(role_required(["student"]))
):
    return {
        "user": user["email"],
        "progress": "70%",
        "average_score": 8.2
    }