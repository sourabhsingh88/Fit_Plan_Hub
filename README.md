# FitPlanHub

FitPlanHub is a full-stack fitness platform that connects users with verified trainers.
Users can follow trainers, view structured fitness plans in their feed, and subscribe to plans.
Trainers manage plans and followers through a dedicated dashboard.

The project demonstrates:
- JWT-based authentication
- Role-based access control (User / Trainer)
- Relational database design
- Clean Angular frontend with modular architecture


## Architecture Overview

### Backend
- FastAPI for REST APIs
- SQLAlchemy ORM
- JWT authentication with role-based dependencies
- MySQL database

### Frontend
- Angular (Standalone Components)
- Reactive Forms
- Route guards for protected pages
- Centralized services for API communication


## User Roles & Flow

### User
- Register / Login
- Follow trainers
- View personalized feed (plans from followed trainers)
- Subscribe to plans

### Trainer
- Login using same auth endpoint
- Create and manage plans
- View dashboard with:
  - Total plans
  - Followers count


## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd Fit_Plan_Backend
```
### 2. Create Virtual Environment
```bash
python -m venv .venv
```
Activate the environment:

Windows :
```bash
.venv\Scripts\activate
```
Linux / macOS :


```bash
source .venv/bin/activate
```
### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

Database Setup (MySQL)
Ensure MySQL service is running.

Create the database:
```sql
    CREATE DATABASE fitplanhub;

    -- CREATE DATABASE

    CREATE DATABASE IF NOT EXISTS fitplanhub
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

    USE fitplanhub;


    -- USERS TABLE

    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('USER', 'TRAINER') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;


    -- TRAINER FOLLOWERS

    CREATE TABLE trainer_followers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        trainer_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT uq_user_trainer UNIQUE (user_id, trainer_id),
        CONSTRAINT fk_tf_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,
        CONSTRAINT fk_tf_trainer
            FOREIGN KEY (trainer_id)
            REFERENCES users(id)
            ON DELETE CASCADE
    ) ENGINE=InnoDB;


    -- PLANS

    CREATE TABLE plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        trainer_id INT NOT NULL,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        duration_days INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_plans_trainer
            FOREIGN KEY (trainer_id)
            REFERENCES users(id)
            ON DELETE CASCADE
    ) ENGINE=InnoDB;


    -- SUBSCRIPTIONS

    CREATE TABLE subscriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        plan_id INT NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT uq_user_plan UNIQUE (user_id, plan_id),
        CONSTRAINT fk_sub_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,
        CONSTRAINT fk_sub_plan
            FOREIGN KEY (plan_id)
            REFERENCES plans(id)
            ON DELETE CASCADE
    ) ENGINE=InnoDB;


```

### Environment Variables (.env)
Create a .env file in the backend root directory:
```
DATABASE_URL=mysql+pymysql://root:<your_password>@127.0.0.1:3306/fitplanhub
JWT_SECRET_KEY=your_secret_key_here
```
The .env file is ignored by Git and should not be committed.

Run the Application

```bash
uvicorn main:app --reload
```
The server will start at:
```
http://127.0.0.1:8000 
```


## Frontend Setup

```bash
cd frontend
npm install
ng serve

```
ensure environment.ts points to backend :
export const environment = {
  apiUrl: 'http://127.0.0.1:8000'
};
Frontend runs at:
http://localhost:4200



### Quick API Summary (FAST SCAN)

Core API Endpoints

| Method | Endpoint              | Description                    |
|------|----------------------|--------------------------------|
| POST | /auth/register        | Register user or trainer       |
| POST | /auth/login           | Login & receive JWT            |
| GET  | /users/feed           | User feed (followed trainers)  |
| POST | /users/follow/{id}    | Follow a trainer               |
| GET  | /trainer/dashboard    | Trainer dashboard              |


## API Testing (Postman)

A Postman collection is included in the repository to make testing easier: `FitPlanHub_Postman_Collection.json`.

### Steps to Test:

1. **Import:** Import the JSON file into Postman.
2. **Environment:** Create a new environment in Postman and add the following variable:
    * `base_url`: `http://127.0.0.1:8000`
3. **Run Flows:** The collection covers the following workflows for both Trainers and Users:
    * **Auth:** Signup & Login
    * **Plans:** Create plans & Subscribe to plans
    * **Social:** Follow trainers & View user feed

### Notes:
* **Database:** Tables are auto-created on application startup (for demo purposes).
* **Auth:** The same Login API is used for both users and trainers.
* **Security:** Authorization is enforced using JWT role claims and FastAPI dependencies.


## Assumptions & Limitations

- Payment gateway is not integrated (subscription is logical only)
- Password reset flow is not implemented
- Database tables are auto-created for demo purposes
- No deployment pipeline included




<p align="center">```Created By Sourabh Singh ```</p>
