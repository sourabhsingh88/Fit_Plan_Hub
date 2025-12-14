from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas.plan import PlanCreate, PlanResponse
from models.plan import Plan
from models.subscription import Subscription
from auth.dependencies import require_trainer, require_user

router = APIRouter(prefix="/plans", tags=["Plans"])


@router.post("/", response_model=PlanResponse)
def create_plan(
    data: PlanCreate,
    trainer=Depends(require_trainer),
    db: Session = Depends(get_db)
):
    plan = Plan(trainer_id=trainer.id, **data.dict())
    db.add(plan)
    db.commit()
    db.refresh(plan)
    return plan


@router.get("/", response_model=list[PlanResponse])
def list_plans(db: Session = Depends(get_db)):
    return db.query(Plan).all()


@router.post("/{plan_id}/subscribe")
def subscribe_plan(
    plan_id: int,
    user=Depends(require_user),
    db: Session = Depends(get_db)
):
    sub = Subscription(user_id=user.id, plan_id=plan_id)
    db.add(sub)
    db.commit()
    return {"message": "Subscribed"}
