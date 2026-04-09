"""
Logs API routes — retrieval and manual entry of system logs.
"""

from fastapi import APIRouter, HTTPException, Query
from datetime import datetime, timezone
from typing import Optional

from database.connection import logs_collection
from schemas.vehicle import LogIn

router = APIRouter(prefix="/logs", tags=["Logs"])


# ——— GET /logs ———
@router.get("/", response_model=list)
async def get_logs(userId: Optional[str] = Query(default="vguardUser")):
    """
    Return all logs for a given user, sorted by most recent first.
    """
    try:
        cursor = logs_collection.find(
            filter={"userId": userId},
            projection={"_id": 0, "userId": 0}
        ).sort("timestamp", -1).limit(200)

        logs = []
        for doc in cursor:
            if doc.get("timestamp"):
                doc["timestamp"] = doc["timestamp"].isoformat()
            logs.append(doc)

        return logs
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


# ——— POST /logs ———
@router.post("/", response_model=dict)
async def post_log(log: LogIn):
    """
    Add a manual log entry with eventCode.
    """
    try:
        user_id = log.userId or "vguardUser"
        doc = {
            "userId": user_id,
            "eventCode": log.eventCode,
            "message": log.message,
            "type": log.type,
            "timestamp": datetime.now(timezone.utc),
        }
        result = logs_collection.insert_one(doc)
        return {"status": "ok", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
