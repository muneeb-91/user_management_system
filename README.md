# Project Title  
### User Management System
A full-stack MERN application that can be used to handle user roles and thier operations. 
This project is divided into two folders `frontend` (React) and `backend` (Express + Node.js).  

---

## 📷 Screenshots

![screenshot_1](https://github.com/muneeb-91/user_management_system/blob/32c1a3afbadc6c8808af1d7bde82e25176f10b25/screenshots/ums-1.png)

![screenshot_2](https://github.com/muneeb-91/user_management_system/blob/32c1a3afbadc6c8808af1d7bde82e25176f10b25/screenshots/ums-2.png)

![screenshot_3](https://github.com/muneeb-91/user_management_system/blob/32c1a3afbadc6c8808af1d7bde82e25176f10b25/screenshots/ums-3.png)

![screenshot_4](https://github.com/muneeb-91/user_management_system/blob/32c1a3afbadc6c8808af1d7bde82e25176f10b25/screenshots/ums-4.png)

---
## 📂 Project Structure  

```bash
root
├── backend # Express server (API)
└── frontend # React client
```
---

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  

```bash
git clone https://github.com/muneeb-91/project_name.git
cd project_name
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```
#### Create .env file inside backend

```bash
MONGO_URI = your_mongoDB_connection_string
PORT= your_backend_port
JWT_SECRET=your_JWT_secret
NODE_ENV=development/production
ADMIN_EMAIL=admin_email
ADMIN_PASS=admin_pass
```

#### Run the backend
With nodemon:

```bash
nodemon server.js
```
OR with "dev" script:

```bash
npm run dev
```
OR normally with:

```bash
node server.js
```
### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```
#### Go to src/lib/axios.js file inside frontend
Use the backend link with same port in "backend/.env" like:

```bash
baseURL: http://localhost:3001/api
```

#### Run the frontend

```bash
npm run dev
```
Frontend will run at http:localhost:5173

---

## 📸 Features

**→ Engaging UI with same color scheme**

**→ Easy to use**

**→ Responsive according to all screen sizes**

**→ All Crud Operations**

---

## ⚙️ Tech Stack

**→ Frontend React, Vite, TailwindCSS**

**→ Backend Node.js, Express**
