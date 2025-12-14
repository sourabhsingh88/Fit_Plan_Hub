from fastapi import FastAPI
from database import engine
from models import Base
from routes import auth, plan, user

app = FastAPI(title="FitPlanHub API")


@app.get("/")
def home():
    return {"message" : "WelCome To Fit Plan Hub "}

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(plan.router)
app.include_router(user.router)
