"""
GPS Simulator — generates realistic-looking vehicle movement data
when no ESP32 hardware is connected.

The simulated vehicle:
- Starts in Ahmedabad, India (23.0225, 72.5714)
- Moves in a semi-random path with smooth directional changes
- Varies speed realistically (0–80 km/h)
- Stores data to MongoDB every TICK_INTERVAL_SECONDS seconds
- Generates alert-type log entries with proper eventCodes
- Performs theft detection (movement while locked)
"""

import threading
import time
import math
import random
from datetime import datetime, timezone

from database.connection import (
    vehicle_data_collection,
    vehicle_status_collection,
    logs_collection,
    trim_vehicle_data,
)

# ——— Constants ———
USER_ID = "vguardUser"
THEFT_SPEED_THRESHOLD = 5.0  # km/h

# ——— ⚙️ Global tick interval — change this one value to control all speeds ———
# Examples: 2 = every 2s (fast/dev), 15 = every 15s, 30 = every 30s (slow/demo)
TICK_INTERVAL_SECONDS = 10


class VehicleSimulator:
    def __init__(self):
        # Starting position: Ahmedabad, India
        self.latitude = 23.0225
        self.longitude = 72.5714
        self.speed = 0.0
        self.heading = random.uniform(0, 360)  # degrees
        self.running = False
        self._thread = None

    def start(self):
        """Start the simulation in a background thread."""
        if self.running:
            return
        self.running = True
        self._thread = threading.Thread(target=self._run_loop, daemon=True)
        self._thread.start()
        print("[SIMULATOR] Vehicle simulation started.")

        # Log the start event
        try:
            logs_collection.insert_one({
                "userId": USER_ID,
                "eventCode": "SIMULATION_STARTED",
                "message": "GPS simulation started — generating virtual vehicle movement",
                "type": "info",
                "timestamp": datetime.now(timezone.utc),
            })
        except Exception as e:
            print(f"[SIMULATOR] Error logging start event: {e}")

    def stop(self):
        """Stop the simulation."""
        self.running = False
        if self._thread:
            self._thread.join(timeout=5)
        print("[SIMULATOR] Vehicle simulation stopped.")

    def _run_loop(self):
        """Core simulation loop — runs in a background thread."""
        tick = 0
        while self.running:
            self._update_position()
            self._store_data()
            self._check_theft()

            # Every ~10 ticks (~5 minutes), generate a random event for demo
            tick += 1
            if tick % 10 == 0:
                self._generate_random_event()

            time.sleep(TICK_INTERVAL_SECONDS)

    def _update_position(self):
        """Update vehicle heading, speed, and position with realistic variation."""
        # Smooth heading changes (±15° per tick for gentle curves)
        self.heading += random.uniform(-15, 15)
        self.heading %= 360

        # Speed variation: accelerate/decelerate gradually
        speed_change = random.uniform(-8, 8)
        self.speed = max(0, min(80, self.speed + speed_change))

        # Add occasional stops (simulates traffic lights)
        if random.random() < 0.03:
            self.speed = 0

        # Convert speed (km/h) over 2-second interval to degree displacement
        # ~111,000 meters per degree at equator
        distance_km = self.speed * (2 / 3600)  # km traveled in 2 seconds
        distance_deg = distance_km / 111.0

        # Apply heading to get lat/lng delta
        heading_rad = math.radians(self.heading)
        self.latitude += distance_deg * math.cos(heading_rad)
        self.longitude += distance_deg * math.sin(heading_rad)

        # Keep coordinates within a reasonable bounding box around Ahmedabad
        self.latitude = max(22.95, min(23.10, self.latitude))
        self.longitude = max(72.50, min(72.65, self.longitude))

    def _store_data(self):
        """Write the current position to MongoDB and trim old entries."""
        try:
            vehicle_data_collection.insert_one({
                "userId": USER_ID,
                "latitude": round(self.latitude, 6),
                "longitude": round(self.longitude, 6),
                "speed": round(self.speed, 1),
                "timestamp": datetime.now(timezone.utc),
            })
            # Periodically trim to prevent DB overload
            trim_vehicle_data(USER_ID)
        except Exception as e:
            print(f"[SIMULATOR] Error storing data: {e}")

    def _check_theft(self):
        """
        Theft detection: if vehicle is LOCKED and speed exceeds threshold,
        generate a THEFT_DETECTED alert and kill the engine.
        """
        if self.speed <= THEFT_SPEED_THRESHOLD:
            return

        try:
            status = vehicle_status_collection.find_one(
                {"userId": USER_ID},
                projection={"_id": 0, "lock": 1}
            )
            if status and status.get("lock") == "LOCKED":
                now = datetime.now(timezone.utc)

                logs_collection.insert_one({
                    "userId": USER_ID,
                    "eventCode": "THEFT_DETECTED",
                    "message": f"Unauthorized movement detected — speed {self.speed:.1f} km/h while vehicle is LOCKED",
                    "type": "alert",
                    "timestamp": now,
                })

                vehicle_status_collection.update_one(
                    {"userId": USER_ID},
                    {"$set": {
                        "engine": "OFF",
                        "lastUpdated": now,
                    }},
                )
                print(f"[THEFT] Alert triggered — speed {self.speed:.1f} km/h while LOCKED")
        except Exception as e:
            print(f"[SIMULATOR] Error checking theft: {e}")

    def _generate_random_event(self):
        """Create a random event log for demonstration purposes."""
        events = [
            {
                "eventCode": "VEHICLE_MOVED",
                "message": "Vehicle detected in motion — position updating",
                "type": "info",
            },
            {
                "eventCode": "SPEED_EXCEEDED",
                "message": "Vehicle exceeded speed limit of 60 km/h",
                "type": "alert",
            },
            {
                "eventCode": "SYSTEM_HEALTH_OK",
                "message": "System health check completed — all sensors operational",
                "type": "info",
            },
            {
                "eventCode": "GPS_SIGNAL_LOST",
                "message": "GPS signal temporarily lost and recovered",
                "type": "alert",
            },
        ]
        chosen = random.choice(events)
        try:
            logs_collection.insert_one({
                "userId": USER_ID,
                "eventCode": chosen["eventCode"],
                "message": chosen["message"],
                "type": chosen["type"],
                "timestamp": datetime.now(timezone.utc),
            })
        except Exception as e:
            print(f"[SIMULATOR] Error creating event log: {e}")


# Singleton instance
simulator = VehicleSimulator()
