"""
V-Guard Backend — FastAPI Application Entry Point

IoT Vehicle Tracking & Theft Prevention System
Provides REST APIs for vehicle GPS data, control commands, logs,
and a built-in GPS simulator for demo/development mode.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.connection import init_db
from routers import vehicle, logs
from simulation.simulator import simulator


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Startup and shutdown events.
    - On startup: initialize DB and start the GPS simulator.
    - On shutdown: stop the simulator gracefully.
    """
    # ——— Startup ———
    print("=" * 50)
    print("[STARTUP] Initializing database...")
    print("[STARTUP] Starting simulator...")
    print("[STARTUP] Server ready at http://localhost:8000")

    print("=" * 50)
    try:
        init_db()
        print("[DB] Connected successfully")
    except Exception as e:
        print(f"[DB ERROR] {e}")    
        
    simulator.start()
    yield
    # ——— Shutdown ———
    simulator.stop()
    print("[APP] V-Guard Backend shut down.")


app = FastAPI(
    title="V-Guard API",
    description="IoT Vehicle Tracking & Theft Prevention System — Backend API",
    version="1.0.0",
    lifespan=lifespan,
)

# ——— CORS Middleware ———
# Allow all origins for development. In production, restrict to your frontend URL.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ——— Register Routers ———
app.include_router(vehicle.router)
app.include_router(logs.router)


# ——— Root Endpoint ———
@app.get("/", tags=["Health"])
async def root():
    return {
        "name": "V-Guard API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }
