from fastapi import APIRouter

router = APIRouter()

@router.post("  /mark")
def ai_mark():
    return {
        "score": 8.0,
        "strengths": "Strong algebra skills",
        "weaknesses": "Geometry needs improvement",
        "recommendation": "Review Circle Theorem"
    }
