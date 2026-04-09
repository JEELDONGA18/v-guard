"""
MongoDB connection module.
Reads MONGO_URI and DB_NAME from the .env file and provides
a shared database handle used by routers and the simulator.
"""

import os
from datetime import datetime, timezone
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

# Create a single MongoClient instance (connection pooling handled internally)
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# ——— Collections ———
vehicle_data_collection = db["vehicleData"]
vehicle_status_collection = db["vehicleStatus"]
logs_collection = db["logs"]

# ——— Constants ———
MAX_VEHICLE_DATA_ENTRIES = 500  # Per-user data cap to prevent DB overload


def init_db():
    """
    Initialize the database with default vehicle status if none exists.
    Called once at application startup.
    """
    # Ensure a default vehicle status document exists for the demo user
    if vehicle_status_collection.count_documents({"userId": "vguardUser"}) == 0:
        vehicle_status_collection.insert_one({
            "userId": "vguardUser",
            "lock": "UNLOCKED",
            "engine": "ON",
            "lastUpdated": datetime.now(timezone.utc),
        })
        print("[DB] Initialized default vehicle status.")

    # Create indexes for performance
    vehicle_data_collection.create_index([("userId", 1), ("timestamp", -1)])
    vehicle_status_collection.create_index([("userId", 1)], unique=True)
    logs_collection.create_index([("userId", 1), ("timestamp", -1)])

    print(f"[DB] Connected to MongoDB: {DB_NAME}")


def trim_vehicle_data(user_id: str):
    """
    Keep only the most recent MAX_VEHICLE_DATA_ENTRIES GPS data points
    for a given user. Deletes older entries to prevent database overload.
    """
    try:
        count = vehicle_data_collection.count_documents({"userId": user_id})
        if count > MAX_VEHICLE_DATA_ENTRIES:
            # Find the timestamp of the Nth-newest document
            cutoff_doc = vehicle_data_collection.find(
                {"userId": user_id},
                projection={"timestamp": 1},
            ).sort("timestamp", -1).skip(MAX_VEHICLE_DATA_ENTRIES).limit(1)

            cutoff_list = list(cutoff_doc)
            if cutoff_list:
                cutoff_time = cutoff_list[0]["timestamp"]
                result = vehicle_data_collection.delete_many({
                    "userId": user_id,
                    "timestamp": {"$lte": cutoff_time},
                })
                if result.deleted_count > 0:
                    print(f"[DB] Trimmed {result.deleted_count} old GPS entries for {user_id}")
    except Exception as e:
        print(f"[DB] Error trimming vehicle data: {e}")
