"""
GPS Simulator — generates realistic-looking vehicle movement data
when no ESP32 hardware is connected.

The simulated vehicle:
- Starts in Ahmedabad, India (23.0225, 72.5714)
- Moves in a semi-random path with smooth directional changes
- Varies speed realistically (0–80 km/h)
- Stores data to MongoDB every 2 seconds
- Occasionally generates alert-type log entries for demo purposes
"""

import threading
import time
import math
import random
from datetime import datetime, timezone

from database.connection import vehicle_data_collection, logs_collection


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
        logs_collection.insert_one({
            "message": "GPS simulation started — generating virtual vehicle movement",
            "type": "info",
            "timestamp": datetime.now(timezone.utc),
        })

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

            # Every ~30 ticks (~60 seconds), generate a random alert for demo
            tick += 1
            if tick % 30 == 0:
                self._generate_random_alert()

            time.sleep(2)

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
        """Write the current position to MongoDB."""
        try:
            vehicle_data_collection.insert_one({
                "latitude": round(self.latitude, 6),
                "longitude": round(self.longitude, 6),
                "speed": round(self.speed, 1),
                "timestamp": datetime.now(timezone.utc),
            })
        except Exception as e:
            print(f"[SIMULATOR] Error storing data: {e}")

    def _generate_random_alert(self):
        """Create a random alert for demonstration purposes."""
        alerts = [
            {"message": "Unusual movement detected — possible unauthorized access", "type": "warning"},
            {"message": "Vehicle exceeded speed limit of 60 km/h", "type": "alert"},
            {"message": "Geofence boundary approached — 200m from limit", "type": "geofence"},
            {"message": "Vibration sensor triggered while engine is off", "type": "danger"},
            {"message": "GPS signal temporarily lost and recovered", "type": "warning"},
            {"message": "System health check completed — all sensors operational", "type": "success"},
        ]
        chosen = random.choice(alerts)
        try:
            logs_collection.insert_one({
                "message": chosen["message"],
                "type": chosen["type"],
                "timestamp": datetime.now(timezone.utc),
            })
        except Exception as e:
            print(f"[SIMULATOR] Error creating alert: {e}")


# Singleton instance
simulator = VehicleSimulator()
