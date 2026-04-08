"""
MongoDB document structure reference.
These are not enforced by MongoDB but serve as documentation
for the shape of documents in each collection.
"""

# ——— vehicleData collection ———
# {
#     "latitude": float,      # e.g. 23.022505
#     "longitude": float,     # e.g. 72.571365
#     "speed": float,         # km/h, e.g. 42.5
#     "timestamp": datetime   # UTC timestamp
# }

# ——— vehicleStatus collection ———
# {
#     "lockState": str,       # "LOCKED" | "UNLOCKED"
#     "engineState": str      # "ON" | "OFF"
# }

# ——— logs collection ———
# {
#     "message": str,         # Human-readable log message
#     "type": str,            # "info" | "alert" | "warning" | "danger" | "control" | "success"
#     "timestamp": datetime   # UTC timestamp
# }
