"""
EconoMind Backend API
Cloud Run Hackathon 2025 - AI Agents Category
Built with Google ADK (Agent Development Kit) 
"""

# Import course data from the separate file
from courses_data import COURSES

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os

# Import ADK agents
from agents import run_professor, run_coach

# Define constants for course titles to avoid string duplication
COURSE_TITLE_GDP = "GDP and Economic Growth"
COURSE_TITLE_TRADE = "International Trade" 

app = FastAPI(
    title="EconoMind API",
    description="Educational AI platform with ADK-powered Professor and Coach agents",
    version="2.0.0"
)

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],  # Update with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================== DATA MODELS ==================== 

class ChatMessage(BaseModel):
    message: str
    # Context of the current course for targeted answers
    course_context: Optional[str] = None
    # Context on already viewed courses for smart revisions
    viewed_courses_context: Optional[List[str]] = None


class ChatResponse(BaseModel):
    response: str
    agent_type: str


# ==================== API ENDPOINTS ==================== 

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "running",
        "service": "EconoMind API",
        "version": "2.0.0",
        "agents": ["professor", "coach"],
        "powered_by": "Google ADK (Agent Development Kit)"
    }


@app.get("/api/courses")
async def get_courses(): 
    """Get all available courses"""
    # Return only the information needed for the course list
    courses_summary = [
        {"id": c["id"], "title": c["title"], "description": c["description"]}
        for c in COURSES
    ]
    return {"courses": courses_summary}


@app.get("/api/courses/{course_id}")
async def get_course(course_id: str): 
    """Gets specific course details"""
    course = next((c for c in COURSES if c["id"] == course_id), None)
    if course:
        return course
    else:
        raise HTTPException(status_code=404, detail="Course not found")


@app.post("/api/chat/professor", response_model=ChatResponse) 
async def chat_with_professor(message: ChatMessage):
    """
    Chat with the Professor agent (ADK-powered)
    The Professor explains concepts and provides theoretical knowledge
    """
    try:
        response = run_professor(
            user_message=message.message,
            course_context=message.course_context,
            viewed_courses=message.viewed_courses_context
        )
        
        return ChatResponse(
            response=response,
            agent_type="professor"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/chat/coach", response_model=ChatResponse) 
async def chat_with_coach(message: ChatMessage):
    """
    Chat with the Coach agent (ADK-powered)
    The Coach provides practical exercises and applications
    """
    try:
        response = run_coach(
            user_message=message.message,
            course_context=message.course_context,
            viewed_courses=message.viewed_courses_context
        )
        
        return ChatResponse(
            response=response,
            agent_type="coach"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== RUN SERVER ==================== 

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)