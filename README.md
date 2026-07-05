# 💰 Expense Tracker

A full-stack Expense Tracker application built with the MERN-style stack (React, Node.js, Express.js, MySQL). It allows users to securely manage their daily expenses with JWT authentication, password recovery using OTP, and complete CRUD functionality.

---

## 🚀 Features

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Forgot Password
- Email OTP Verification
- Reset Password

### 💸 Expense Management

- Add Expense
- View All Expenses
- Update Expense
- Delete Expense
- Total Expense Calculation
- Expenses Sorted by Date

---

## 🛠 Tech Stack

### Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Fetch API

### Backend

- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt
- Nodemailer

---

## 📁 Project Structure

```
ExpenseTracker
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── utils
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🗄 Database

### Users Table

- id
- name
- email
- password
- otp
- otp_expiry
- created_at

### Expenses Table

- id
- user_id
- title
- amount
- category
- expense_date
- created_at

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/signup` | Register User |
| POST | `/login` | Login User |
| POST | `/forgot-password` | Send OTP |
| POST | `/verify-otp` | Verify OTP |
| PUT | `/reset-password` | Reset Password |
| GET | `/dashboard` | Get Logged-in User |

---

### Expenses

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/expenses` | Get All Expenses |
| POST | `/expenses` | Add Expense |
| PUT | `/expenses/:id` | Update Expense |
| DELETE | `/expenses/:id` | Delete Expense |

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/Sarankumar-dot/ExpenseTracker.git
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=expense_tracker

JWT_SECRET=your_secret_key

EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

---

## 📸 Screenshots

Add screenshots of the following pages:

- Login
- Signup
- Dashboard
- Add Expense
- Edit Expense
- Forgot Password
- OTP Verification
- Reset Password

---

## 🎯 Future Improvements

- Search Expenses
- Filter by Category
- Sort by Amount
- Monthly Reports
- Expense Charts
- Dark Mode
- Export Expenses to PDF/Excel
- User Profile
- Pagination

---

## 📚 What I Learned

- React Components
- React Hooks
- State Management
- React Router
- Tailwind CSS
- Node.js
- Express.js
- MySQL
- JWT Authentication
- Password Hashing using bcrypt
- OTP Authentication
- REST API Development
- CRUD Operations
- Protected Routes

---

## 👨‍💻 Author

**Sarankumar K**

GitHub: https://github.com/Sarankumar-dot

Portfolio: https://sarankumar7639.neocities.org/

---

⭐ If you like this project, consider giving it a star!
