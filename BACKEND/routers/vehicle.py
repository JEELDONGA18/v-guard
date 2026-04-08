"""
Vehicle API routes — GPS data ingestion, retrieval, and control.
"""

from fastapi import APIRouter, HTTPException
from datetime import datetime, timezone

from database.connection import vehicle_data_collection, vehicle_status_collection, logs_collection
from schemas.vehicle import VehicleDataIn, VehicleDataOut, VehicleControlIn, VehicleStatusOut

router = APIRouter(prefix="/vehicle", tags=["Vehicle"])


# ——— POST /vehicle/data ———
@router.post("/data", response_model=dict)
async def post_vehicle_data(data: VehicleDataIn):
    """
    Store GPS data from the ESP32 module or simulator.
    """
    try:
        doc = {
            "latitude": data.latitude,
            "longitude": data.longitude,
            "speed": data.speed,
            "timestamp": datetime.now(timezone.utc),
        }
        result = vehicle_data_collection.insert_one(doc)
        return {"status": "ok", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# ——— GET /vehicle/data ———
@router.get("/data", response_model=VehicleDataOut)
async def get_vehicle_data():
    """
    Return the latest vehicle GPS data.
    """
    try:
        doc = vehicle_data_collection.find_one(
            sort=[("timestamp", -1)],
            projection={"_id": 0}
        )
        if not doc:
            return VehicleDataOut(latitude=23.0225, longitude=72.5714, speed=0.0, timestamp=None)

        # Convert datetime to string for JSON
        doc["timestamp"] = doc["timestamp"].isoformat() if doc.get("timestamp") else None
        return VehicleDataOut(**doc)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# ——— POST /vehicle/control ———
@router.post("/control", response_model=dict)
async def post_vehicle_control(cmd: VehicleControlIn):
    """
    Lock or unlock the vehicle. Updates status and creates a log entry.
    """
    try:
        action = cmd.action  # "LOCK" or "UNLOCK"

        # Update vehicle status
        new_lock_state = "LOCKED" if action == "LOCK" else "UNLOCKED"
        new_engine_state = "OFF" if action == "LOCK" else "ON"

        vehicle_status_collection.update_one(
            {},
            {"$set": {
                "lockState": new_lock_state,
                "engineState": new_engine_state,
            }},
            upsert=True,
        )

        # Create a log entry
        log_entry = {
            "message": f"Vehicle {action}ED by user",
            "type": "control",
            "timestamp": datetime.now(timezone.utc),
        }
        logs_collection.insert_one(log_entry)

        return {
            "status": "ok",
            "lockState": new_lock_state,
            "engineState": new_engine_state,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# ——— GET /vehicle/status ———
@router.get("/status", response_model=VehicleStatusOut)
async def get_vehicle_status():
    """
    Return current vehicle lock and engine state.
    """
    try:
        doc = vehicle_status_collection.find_one(projection={"_id": 0})
        if not doc:
            return VehicleStatusOut(lockState="UNLOCKED", engineState="ON")
        return VehicleStatusOut(**doc)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
