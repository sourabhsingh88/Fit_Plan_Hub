from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db
from auth.jwt import decode_access_token
from models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == payload.get("user_id")).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


def require_user(user: User = Depends(get_current_user)):
    if user.role.value != "USER":
        raise HTTPException(status_code=403, detail="User access required")
    return user


def require_trainer(user: User = Depends(get_current_user)):
    if user.role.value != "TRAINER":
        raise HTTPException(status_code=403, detail="Trainer access required")
    return user
