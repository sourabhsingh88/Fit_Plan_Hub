# FitPlanHub Backend

FitPlanHub is a FastAPI-based backend application that supports trainers and users with role-based authentication, fitness plan management, subscriptions, and personalized feeds.

---

## Tech Stack

- Backend: FastAPI  
- Database: MySQL  
- ORM: SQLAlchemy  
- Authentication: JWT (JSON Web Token)  
- Password Hashing: Passlib (bcrypt)  
- API Testing: Postman  

---

## Features

- User and Trainer signup & login
- JWT-based authentication
- Role-based authorization (USER / TRAINER)
- Trainer can create fitness plans
- Users can subscribe to plans
- Users can follow trainers
- Personalized feed for users
- Postman collection included for API testing

---

## Project Structure

Fit_Plan_Backend/
├── main.py
├── database.py
├── config.py
├── models/
├── schemas/
├── auth/
├── routes/
├── utils/
├── requirements.txt
├── .env
└── FitPlanHub_Postman_Collection.json


## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd Fit_Plan_Backend
2. Create Virtual Environment
bash
Copy code
python -m venv .venv
Activate the environment:

Windows

bash
Copy code
.venv\Scripts\activate
Linux / macOS

bash
Copy code
source .venv/bin/activate
3. Install Dependencies
bash
Copy code
pip install -r requirements.txt
Database Setup (MySQL)
Ensure MySQL service is running.

Create the database:

sql
Copy code
CREATE DATABASE fitplanhub;
Environment Variables (.env)
Create a .env file in the backend root directory:

ini
Copy code
DATABASE_URL=mysql+pymysql://root:<your_password>@127.0.0.1:3306/fitplanhub
JWT_SECRET_KEY=your_secret_key_here
The .env file is ignored by Git and should not be committed.

Run the Application
bash
Copy code
uvicorn main:app --reload
The server will start at:

cpp
Copy code
http://127.0.0.1:8000
API Documentation
Swagger UI is available at:

arduino
Copy code
http://127.0.0.1:8000/docs
API Testing (Postman)
A Postman collection is included in the repository:

pgsql
Copy code
FitPlanHub_Postman_Collection.json
Steps:

Import the collection into Postman

Create an environment with:


base_url = http://127.0.0.1:8000
Test trainer and user flows:

Signup

Login

Create plans

Subscribe to plans

Follow trainer

User feed

Notes
Database tables are auto-created on application startup (demo purpose).

Same login API is used for both users and trainers.

Authorization is enforced using JWT role claims and FastAPI dependencies.
