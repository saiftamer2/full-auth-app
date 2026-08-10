const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const users = require("./data/users");
const authenticateToken = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// ====================
// Home Route
// ====================

app.get("/", (req, res) => {
  res.json({
    message: "Authentication Backend is running!"
  });
});

// ====================
// Signup
// ====================

app.post("/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required."
      });
    }

    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword
    };

    users.push(newUser);

    console.log("New user created:", {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    });

    res.status(201).json({
      message: "User created successfully.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Server error."
    });
  }
});

// ====================
// Login
// ====================

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const user = users.find(
      (user) => user.email === email
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from .env");

      return res.status(500).json({
        message: "JWT secret is not configured."
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    console.log("User logged in:", user.email);

    res.json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error."
    });
  }
});

// ====================
// Protected Route
// ====================

app.get("/auth/me", authenticateToken, (req, res) => {
  const user = users.find(
    (user) => user.id === req.user.id
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found."
    });
  }

  res.json({
    message: "You are authenticated.",
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

// ====================
// Start Server
// ====================

app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`
  );
});