"""
Vehicle API routes — GPS data ingestion, retrieval, control, and theft detection.
"""

from fastapi import APIRouter, HTTPException, Query
from datetime import datetime, timezone
from typing import Optional

from database.connection import (
    vehicle_data_collection,
    vehicle_status_collection,
    logs_collection,
    trim_vehicle_data,
)
from schemas.vehicle import VehicleDataIn, VehicleDataOut, VehicleControlIn, VehicleStatusOut

router = APIRouter(prefix="/vehicle", tags=["Vehicle"])

# ——— Theft detection threshold ———
THEFT_SPEED_THRESHOLD = 5.0  # km/h — movement above this while locked triggers alert


# ——— POST /vehicle/data ———
@router.post("/data", response_model=dict)
async def post_vehicle_data(data: VehicleDataIn):
    """
    Store GPS data from the ESP32 module or simulator.
    Also performs theft detection: if vehicle is LOCKED and speed > threshold,
    generates a THEFT_DETECTED alert and kills the engine.
    """
    try:
        user_id = data.userId or "vguardUser"
        now = datetime.now(timezone.utc)

        doc = {
            "userId": user_id,
            "latitude": data.latitude,
            "longitude": data.longitude,
            "speed": data.speed,
            "timestamp": now,
        }
        result = vehicle_data_collection.insert_one(doc)

        # ——— Theft Detection ———
        if data.speed > THEFT_SPEED_THRESHOLD:
            status = vehicle_status_collection.find_one(
                {"userId": user_id},
                projection={"_id": 0, "lock": 1}
            )
            if status and status.get("lock") == "LOCKED":
                # Insert theft alert log
                logs_collection.insert_one({
                    "userId": user_id,
                    "eventCode": "THEFT_DETECTED",
                    "message": f"Unauthorized movement detected — speed {data.speed:.1f} km/h while vehicle is LOCKED",
                    "type": "alert",
                    "timestamp": now,
                })

                # Kill engine for safety
                vehicle_status_collection.update_one(
                    {"userId": user_id},
                    {"$set": {
                        "engine": "OFF",
                        "lastUpdated": now,
                    }},
                )
                print(f"[THEFT] Alert triggered for {user_id} — speed {data.speed:.1f} km/h while LOCKED")

        # ——— Data Limiting ———
        trim_vehicle_data(user_id)

        return {"status": "ok", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# ——— GET /vehicle/data ———
@router.get("/data", response_model=VehicleDataOut)
async def get_vehicle_data(userId: Optional[str] = Query(default="vguardUser")):
    """
    Return the latest vehicle GPS data for a given user.
    """
    try:
        doc = vehicle_data_collection.find_one(
            filter={"userId": userId},
            sort=[("timestamp", -1)],
            projection={"_id": 0, "userId": 0}
        )
        if not doc:
            return VehicleDataOut(latitude=23.0225, longitude=72.5714, speed=0.0, timestamp=None)

        doc["timestamp"] = doc["timestamp"].isoformat() if doc.get("timestamp") else None
        return VehicleDataOut(**doc)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# ——— POST /vehicle/control ———
@router.post("/control", response_model=dict)
async def post_vehicle_control(cmd: VehicleControlIn):
    """
    Lock or unlock the vehicle. Updates status and creates a log entry
    with the appropriate eventCode.
    """
    try:
        user_id = cmd.userId or "vguardUser"
        action = cmd.action  # "LOCK" or "UNLOCK"
        now = datetime.now(timezone.utc)

        new_lock = "LOCKED" if action == "LOCK" else "UNLOCKED"
        new_engine = "OFF" if action == "LOCK" else "ON"
        event_code = "ENGINE_LOCKED" if action == "LOCK" else "ENGINE_UNLOCKED"

        vehicle_status_collection.update_one(
            {"userId": user_id},
            {"$set": {
                "userId": user_id,
                "lock": new_lock,
                "engine": new_engine,
                "lastUpdated": now,
            }},
            upsert=True,
        )

        logs_collection.insert_one({
            "userId": user_id,
            "eventCode": event_code,
            "message": f"Vehicle {action}ED by user",
            "type": "control",
            "timestamp": now,
        })

        return {
            "status": "ok",
            "lock": new_lock,
            "engine": new_engine,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# ——— GET /vehicle/status ———
@router.get("/status", response_model=VehicleStatusOut)
async def get_vehicle_status(userId: Optional[str] = Query(default="vguardUser")):
    """
    Return current vehicle lock and engine state for a given user.
    """
    try:
        doc = vehicle_status_collection.find_one(
            filter={"userId": userId},
            projection={"_id": 0, "userId": 0}
        )
        if not doc:
            return VehicleStatusOut(lock="UNLOCKED", engine="ON", lastUpdated=None)

        if doc.get("lastUpdated"):
            doc["lastUpdated"] = doc["lastUpdated"].isoformat()

        return VehicleStatusOut(
            lock=doc.get("lock", "UNLOCKED"),
            engine=doc.get("engine", "ON"),
            lastUpdated=doc.get("lastUpdated"),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
