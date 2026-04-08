"""
MongoDB connection module.
Reads MONGO_URI and DB_NAME from the .env file and provides
a shared database handle used by routers and the simulator.
"""

import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "vguard")

# Create a single MongoClient instance (connection pooling handled internally)
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# ——— Collections ———
vehicle_data_collection = db["vehicleData"]
vehicle_status_collection = db["vehicleStatus"]
logs_collection = db["logs"]


def init_db():
    """
    Initialize the database with default vehicle status if none exists.
    Called once at application startup.
    """
    # Ensure a default vehicle status document exists
    if vehicle_status_collection.count_documents({}) == 0:
        vehicle_status_collection.insert_one({
            "lockState": "UNLOCKED",
            "engineState": "ON",
        })
        print("[DB] Initialized default vehicle status.")

    # Create indexes for performance
    vehicle_data_collection.create_index([("timestamp", -1)])
    logs_collection.create_index([("timestamp", -1)])

    print(f"[DB] Connected to MongoDB: {MONGO_URI} / {DB_NAME}")
