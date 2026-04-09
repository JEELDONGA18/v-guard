"""
Pydantic schemas for request/response validation.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


# ——— Vehicle Data ———

class VehicleDataIn(BaseModel):
    """Schema for incoming GPS data (from ESP32 or simulator)."""
    latitude: float = Field(..., ge=-90, le=90, description="Latitude in degrees")
    longitude: float = Field(..., ge=-180, le=180, description="Longitude in degrees")
    speed: float = Field(..., ge=0, description="Speed in km/h")
    userId: Optional[str] = Field(default="vguardUser", description="User identifier")


class VehicleDataOut(BaseModel):
    """Schema for outgoing GPS data."""
    latitude: float
    longitude: float
    speed: float
    timestamp: Optional[str] = None


# ——— Vehicle Control ———

class VehicleControlIn(BaseModel):
    """Schema for control commands."""
    action: str = Field(..., pattern="^(LOCK|UNLOCK)$", description="LOCK or UNLOCK")
    userId: Optional[str] = Field(default="vguardUser", description="User identifier")


class VehicleStatusOut(BaseModel):
    """Schema for vehicle status response."""
    lock: str = Field(..., description="LOCKED or UNLOCKED")
    engine: str = Field(..., description="ON or OFF")
    lastUpdated: Optional[str] = Field(default=None, description="Last status change timestamp")


# ——— Logs ———

class LogIn(BaseModel):
    """Schema for creating a new log entry."""
    eventCode: str = Field(default="GENERAL", min_length=1, max_length=50, description="Event code e.g. ENGINE_LOCKED")
    message: str = Field(..., min_length=1, max_length=500)
    type: str = Field(default="info", pattern="^(info|alert|control)$")
    userId: Optional[str] = Field(default="vguardUser", description="User identifier")


class LogOut(BaseModel):
    """Schema for log response."""
    eventCode: Optional[str] = None
    message: str
    type: str
    timestamp: Optional[str] = None
