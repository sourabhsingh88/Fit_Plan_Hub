from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.follower import TrainerFollower
from models.plan import Plan
from auth.dependencies import require_user


router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/follow/{trainer_id}")
def follow_trainer(
    trainer_id: int,
    user=Depends(require_user),
    db: Session = Depends(get_db)
):
    follow = TrainerFollower(user_id=user.id, trainer_id=trainer_id)
    db.add(follow)
    db.commit()
    return {"message": "Followed"}


@router.get("/feed")
def user_feed(
    user=Depends(require_user),
    db: Session = Depends(get_db)
):
    return (
        db.query(Plan)
        .join(TrainerFollower, Plan.trainer_id == TrainerFollower.trainer_id)
        .filter(TrainerFollower.user_id == user.id)
        .all()
    )
