# Full Stack Authentication App

A full-stack authentication application built as part of an internship task.

The project demonstrates user signup, login, password hashing, JWT authentication, protected routes, and logout functionality.

## Features

- User signup
- Client-side form validation
- Password hashing using bcrypt
- User login
- JWT authentication
- Secure authenticated API requests using Bearer tokens
- Protected dashboard route
- Automatic redirect for unauthenticated users
- Logout functionality
- Responsive authentication UI

## Technologies Used

### Frontend
- React
- React Router
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- JWT (JSON Web Token)
- bcryptjs
- CORS
- dotenv

## Project Structure

```text
full-auth-app/
│
├── backend/
│   ├── data/
│   │   └── users.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Signup/
│   │   │   ├── Login/
│   │   │   └── Dashboard/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md