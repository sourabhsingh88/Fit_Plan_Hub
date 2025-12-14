from pydantic import BaseModel
from decimal import Decimal
from datetime import datetime
from typing import Optional


class PlanCreate(BaseModel):
    title: str
    description: Optional[str] = None
    price: Decimal
    duration_days: int


class PlanResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    price: Decimal
    duration_days: int
    trainer_id: int
    created_at: datetime

    class Config:
        from_attributes = True
