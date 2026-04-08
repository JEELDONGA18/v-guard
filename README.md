# V-Guard 🛡️

**IoT Vehicle Tracking & Theft Prevention System**

A full-stack web application for real-time vehicle GPS tracking, remote engine lock/unlock, and theft alert monitoring. Built as a college project demonstrating IoT + Web integration.

---

## 🚀 Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React + Vite + Tailwind CSS       |
| Backend   | FastAPI (Python)                  |
| Database  | MongoDB                           |
| Hardware  | ESP32 + NEO-6M GPS Module         |
| Maps      | Leaflet.js (OpenStreetMap/CARTO)  |

---

## 📁 Project Structure

```
V_Guard/
├── FRONTEND/                # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   ├── layouts/         # Layout wrappers
│   │   ├── services/        # API service layer
│   │   └── hooks/           # Custom React hooks
│   └── ...
├── BACKEND/                 # FastAPI backend
│   ├── main.py              # App entry point
│   ├── database/            # MongoDB connection
│   ├── models/              # Document models
│   ├── schemas/             # Pydantic validation
│   ├── routers/             # API route handlers
│   └── simulation/          # GPS simulator
└── README.md
```

---

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** (v18+)
- **Python** (v3.8+)
- **MongoDB** (local instance running on port 27017)

### 1. Frontend

```bash
cd FRONTEND
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

### 2. Backend

```bash
cd BACKEND
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`

### 3. MongoDB

Make sure MongoDB is running locally:

```bash
mongod --dbpath /path/to/data
```

---

## 📡 API Endpoints

| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| GET    | `/vehicle/data`    | Latest GPS coordinates    |
| POST   | `/vehicle/data`    | Store new GPS data        |
| POST   | `/vehicle/control` | Lock / Unlock vehicle     |
| GET    | `/vehicle/status`  | Engine & lock state       |
| GET    | `/logs`            | All system logs           |
| POST   | `/logs`            | Add manual log entry      |

---

## 🎮 Simulation Mode

If no ESP32 hardware is connected, the backend automatically starts a **GPS simulator** that:
- Generates realistic vehicle movement around Ahmedabad, India
- Updates position every 2 seconds
- Creates random alert events for demo purposes

---

## 🎨 Features

- **Dark-themed dashboard** with glassmorphism design
- **Live map** with real-time vehicle marker + route trail
- **Remote control** — Lock/Unlock vehicle with one click
- **Alert system** — Theft detection, geofence warnings
- **System logs** — Complete activity history with filters
- **Responsive design** — Works on desktop and tablet

---

## 👥 Team

College Project — V-Guard IoT Vehicle Tracking System

---

## 📄 License

This project is for educational purposes.
