from pydantic import BaseModel

class UserRegister(BaseModel):
    username: str
    password: str
    role: str  # student / teacher / parent / admin

class UserLogin(BaseModel):
    username: str
    password: str
