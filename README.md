# 🏥 Digital Health Assistant Using AI Symptom Checker

A full-stack MERN application that helps users check symptoms, predict diseases, view prediction history, download reports, and chat with an AI Health Assistant powered by Gemini AI.

## 🚀 Features

### User Features

* User Registration
* User Login Authentication
* AI Symptom Checker
* Disease Prediction
* Prediction History
* PDF Report Download
* AI Health Chatbot
* Responsive Dashboard

### Admin Features

* Admin Dashboard
* Add Disease
* Edit Disease
* Delete Disease
* Manage Disease Database

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

### Database

* MongoDB Atlas
* Mongoose

### AI

* Google Gemini AI API

---

# 📂 Project Structure

Digital-Health-Assistance-Using-AI-Symptom-Checker

/frontend

/backend

README.md

---

# ⚙️ Prerequisites

Install the following before running:

1. Node.js
2. MongoDB Atlas Account
3. Google Gemini API Key
4. Git

---

# 📥 Clone Repository

git clone <repository-url>

cd Digital-Health-Assistance-Using-AI-Symptom-Checker

---

# 🔐 Backend Setup

Open terminal:

cd backend

Install packages:

npm install

Create a file named:

.env

Add:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

---

# ▶️ Start Backend Server

Inside backend folder:

npm run dev

Expected Output:

Server Running on 5000

MongoDB Connected

---

# 💻 Frontend Setup

Open another terminal:

cd frontend

Install packages:

npm install

Start React App:

npm run dev

Expected Output:

Local:
http://localhost:5173

---

# 🌐 Application URLs

Frontend:

http://localhost:5173

Backend:

http://localhost:5000

---

# 👤 User Flow

## Register

1. Open application
2. Click Register
3. Create account
4. Login

## Login

1. Enter Email
2. Enter Password
3. Login

## Symptom Checker

1. Select symptoms
2. Click Check Symptoms
3. View prediction result
4. Download PDF report

## History

1. Open History page
2. View previous predictions

## AI Chatbot

1. Open Chatbot page
2. Ask health questions
3. Receive AI response

---

# 👨‍⚕️ Admin Flow

## Admin Login

Login using admin account.

## Disease Management

Admin can:

* Add Disease
* Edit Disease
* Delete Disease
* View Disease List

---

# 🧠 Gemini AI Setup

Visit:

https://aistudio.google.com/

Create API Key.

Copy API Key.

Add inside:

backend/.env

GEMINI_API_KEY=your_api_key

Restart backend server.

---

# ☁️ MongoDB Atlas Setup

1. Create Atlas Cluster
2. Create Database User
3. Add IP Address

Use connection string:

mongodb+srv://username:password@cluster.mongodb.net/database_name

Paste inside:

MONGO_URI=

Restart backend.

---

# 📦 Install Dependencies

Backend:

npm install express mongoose cors dotenv bcryptjs jsonwebtoken nodemon @google/generative-ai

Frontend:

npm install axios react-router-dom jspdf

---

# 🔧 Common Errors

### MongoDB Connection Error

Check:

* MONGO_URI
* Database User
* Network Access

### Gemini AI Error

Check:

* GEMINI_API_KEY
* Internet Connection
* Gemini Model Name

### Port Already In Use

Change:

PORT=5000

to another port.

---

# 📜 Available Scripts

Backend:

npm run dev

Frontend:

npm run dev

---

# 👨‍💻 Author

Mani Kanta

GitHub:
https://github.com/manikanta1326

---

# 📄 License

This project is for educational and portfolio purposes.
