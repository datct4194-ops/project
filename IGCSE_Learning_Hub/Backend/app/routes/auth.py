from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sqlite3
from pathlib import Path
from app.core.security import hash_password, verify_password, create_access_token

# ✅ DB_PATH PHẢI ĐẶT TRƯỚC
DB_PATH = Path(__file__).resolve().parent.parent / "db" / "igcse.db"

router = APIRouter(prefix="/auth", tags=["Auth"])


class RegisterRequest(BaseModel):
    email: str
    password: str
    role: str
    parent_email: str | None = None


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/register")
def register(data: RegisterRequest):
    try:
        conn = sqlite3.connect(DB_PATH, check_same_thread=False)
        cursor = conn.cursor()

        hashed_pw = hash_password(data.password)

        cursor.execute(
            "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
            (data.email, hashed_pw, data.role)
        )

        conn.commit()
        conn.close()

        return {"message": "User registered successfully"}

    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already exists")


@router.post("/login")
def login(data: LoginRequest):
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id, email, password, role FROM users WHERE email = ?",
        (data.email,)
    )

    user = cursor.fetchone()
    conn.close()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    user_id, email, hashed_pw, role = user

    if not verify_password(data.password, hashed_pw):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({
        "sub": email,
        "user_id": user_id,
        "role": role
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": role
    }
