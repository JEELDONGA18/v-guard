"""
MongoDB document structure reference.
These are not enforced by MongoDB but serve as documentation
for the shape of documents in each collection.
"""

# ——— vehicleData collection ———
# {
#     "userId": str,          # e.g. "vguardUser"
#     "latitude": float,      # e.g. 23.022505
#     "longitude": float,     # e.g. 72.571365
#     "speed": float,         # km/h, e.g. 42.5
#     "timestamp": datetime   # UTC ISO timestamp
# }

# ——— vehicleStatus collection ———
# ONE document per userId (upserted).
# {
#     "userId": str,          # e.g. "vguardUser"
#     "lock": str,            # "LOCKED" | "UNLOCKED"
#     "engine": str,          # "ON" | "OFF"
#     "lastUpdated": datetime # UTC ISO timestamp of last change
# }

# ——— logs collection ———
# {
#     "userId": str,          # e.g. "vguardUser"
#     "eventCode": str,       # e.g. "ENGINE_LOCKED", "THEFT_DETECTED", "SYSTEM_HEALTH_OK"
#     "message": str,         # Human-readable log message
#     "type": str,            # "info" | "alert" | "control"
#     "timestamp": datetime   # UTC ISO timestamp
# }

# ——— Standard Event Codes ———
# ENGINE_LOCKED        — Vehicle locked by user
# ENGINE_UNLOCKED      — Vehicle unlocked by user
# THEFT_DETECTED       — Movement detected while vehicle is locked
# VEHICLE_MOVED        — Vehicle started moving
# SPEED_EXCEEDED       — Vehicle exceeded speed limit
# SYSTEM_HEALTH_OK     — All sensors operational
# GPS_SIGNAL_LOST      — GPS signal temporarily lost
# SIMULATION_STARTED   — GPS simulation started
