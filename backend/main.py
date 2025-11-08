"""
EconoMind Backend API
Cloud Run Hackathon - AI Agents Category
"""

# Import course data from the separate file
from courses_data import COURSES

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List

# Import and configure Gemini
import google.generativeai as genai
import os

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
import os

# Define constants for course titles to avoid string duplication
COURSE_TITLE_GDP = "GDP and Economic Growth"
COURSE_TITLE_TRADE = "International Trade"

app = FastAPI(
    title="EconoMind API",
    description="Educational AI platform with Professor and Coach agents",
    version="1.0.0"
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

# ==================== AI AGENT FUNCTIONS ====================

def professor_agent(user_message: str, course_context: str = None, viewed_courses: List[str] = None) -> str:
    """
    🎓 PROFESSOR AGENT - Powered by Gemini
    Role: Explains concepts clearly with examples
    """
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        # Build context-aware prompt
        context = f"\n\nCourse Context:\n{course_context}" if course_context else ""
        history_context = ""
        if viewed_courses:
            # Create a string listing the viewed courses
            courses_str = ", ".join(viewed_courses)
            history_context = f"\n\nThe student has already viewed the following courses: {courses_str}. If relevant, you can make connections to these topics."
        
        system_prompt = f"""You are an expert economics professor with years of teaching experience.

Your teaching style:
- Clear and structured explanations
- Use real-world examples students can relate to
- Break down complex concepts into digestible parts
- Encourage critical thinking
- Patient and supportive

Guidelines:
- Keep responses concise but comprehensive (200-400 words)
- Use analogies when helpful
- Define technical terms
- Connect concepts to everyday life
{context}
{history_context}

Student Question: {user_message}

Provide a clear, educational response:"""

        response = model.generate_content(system_prompt)
        return response.text
        
    except Exception as e:
        return f"I apologize, but I'm having trouble processing that. Could you rephrase your question? (Error: {str(e)})"


def coach_agent(user_message: str, course_context: str = None, viewed_courses: List[str] = None) -> str:
    """
    💪 COACH AGENT - Powered by Gemini
    Role: Provides practical exercises and training
    """
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        # Build context-aware prompt
        context = f"\n\nCourse Context:\n{course_context}" if course_context else ""
        history_context = ""
        if viewed_courses:
            # Create a string listing the viewed courses
            courses_str = ", ".join(viewed_courses)
            history_context = f"\n\nThe student has already practiced topics from these courses: {courses_str}. You can suggest a revision exercise on one of these topics if the student seems unsure."
        
        system_prompt = f"""You are an economics coach focused on practical application and skill-building.

Your coaching style:
- Action-oriented and motivating
- Create specific, actionable exercises
- Provide constructive feedback
- Focus on real-world applications
- Challenge students to think critically

Guidelines:
- Create concrete exercises or scenarios
- Ask thought-provoking questions
- Provide step-by-step guidance when needed
- Keep responses practical (200-400 words)
- Encourage active learning
{context}
{history_context}

Student Request: {user_message}

Provide a practical, exercise-focused response:"""

        response = model.generate_content(system_prompt)
        return response.text
        
    except Exception as e:
        return f"Oops! I'm having trouble creating that exercise. Let's try something else! (Error: {str(e)})"


# ==================== API ENDPOINTS ====================

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "running",
        "service": "EconoMind API",
        "agents": ["professor", "coach"]
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
    """Get specific course details"""
    course = next((c for c in COURSES if c["id"] == course_id), None)
    if course:
        return course
    else:
        raise HTTPException(status_code=404, detail="Course not found")


@app.post("/api/chat/professor", response_model=ChatResponse)
async def chat_with_professor(message: ChatMessage):
    """
    Chat with the Professor agent
    The Professor explains concepts and provides theoretical knowledge
    """
    try:
        response = professor_agent(
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
    Chat with the Coach agent
    The Coach provides practical exercises and applications
    """
    try:
        response = coach_agent(
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
