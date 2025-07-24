# Employee Management System Backend

This Django backend provides APIs for managing employees, users, attendance records, and payroll within a monolithic internal HR system.

## Features

- Django & Django REST Framework (DRF) project scaffolded for monolithic deployment
- PostgreSQL integration using environment variables for secure configuration
- CORS enabled (for React frontend)
- Models, migrations, and RESTful CRUD endpoints for:
  - Employee
  - User
  - Attendance
  - Payroll
- Skeleton for authentication module (JWT-ready)
- Automated API docs at `/api/docs/`

## Getting Started

1. **Install dependencies**  
   (create/enter venv if desired)
   ```
   pip install -r requirements.txt
   ```

2. **Environment Variables:**  
   Set your environment in a `.env` file:
   ```
   # PostgreSQL
   POSTGRES_HOST=<host>
   POSTGRES_PORT=<port>
   POSTGRES_DB=<dbname>
   POSTGRES_USER=<user>
   POSTGRES_PASSWORD=<password>
   DJANGO_SECRET_KEY=<your-secret>
   DJANGO_DEBUG=True
   ```
   
3. **Migrate DB**
   ```
   python manage.py migrate
   ```

4. **Run backend server**
   ```
   python manage.py runserver 0.0.0.0:8000
   ```

## API Overview

- **/api/users/**: Users CRUD
- **/api/employees/**: Employees CRUD
- **/api/attendance/**: Attendance records CRUD
- **/api/payroll/**: Payroll CRUD
- **/api/auth/**: Authentication endpoints (skeleton)
- **/api/docs/**: Interactive API documentation (Swagger/OpenAPI)

## Authentication
This backend includes a foundation for JWT or session authentication. Plug in your preferred authentication mechanism in `authentication/`.

---
