"""
EconoMind Backend API
Cloud Run Hackathon - AI Agents Category
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os

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
    course_context: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    agent_type: str


# ==================== SAMPLE COURSE DATA ====================

COURSES = {
    "supply-demand": {
        "id": "supply-demand",
        "title": "Supply and Demand",
        "description": "Understanding the fundamental economic concepts of supply and demand",
        "content": """
        Supply and Demand are fundamental economic concepts:
        
        **Supply**: The quantity of a good or service that producers are willing to sell at different prices.
        - Law of Supply: As price increases, quantity supplied increases
        
        **Demand**: The quantity of a good or service that consumers are willing to buy at different prices.
        - Law of Demand: As price increases, quantity demanded decreases
        
        **Equilibrium**: The point where supply equals demand, determining market price.
        
        Key factors affecting supply:
        - Production costs
        - Technology
        - Number of sellers
        
        Key factors affecting demand:
        - Consumer income
        - Preferences
        - Price of related goods
        """
    },
    "inflation": {
        "id": "inflation",
        "title": "Inflation Basics",
        "description": "Learn about inflation and its impact on the economy",
        "content": """
        Inflation is the rate at which prices for goods and services rise over time.
        
        **Key Concepts**:
        - Consumer Price Index (CPI)
        - Purchasing power
        - Real vs Nominal values
        
        **Types of Inflation**:
        1. Demand-pull inflation
        2. Cost-push inflation
        3. Built-in inflation
        
        **Effects**:
        - Reduces purchasing power
        - Affects savings and investments
        - Influences central bank policies
        """
    }
}


# ==================== AI AGENT FUNCTIONS ====================
# 🎯 HAMDANE: C'EST ICI QUE TU INTÈGRES GEMINI !

def professor_agent(user_message: str, course_context: str = None) -> str:
    """
    🎓 PROFESSOR AGENT
    Role: Explains concepts, provides examples, clarifies theory
    
    TODO HAMDANE: Replace this with Gemini API call
    
    Example Gemini integration:
    
    import google.generativeai as genai
    
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
    model = genai.GenerativeModel('gemini-pro')
    
    system_prompt = f'''You are an economics professor. 
    Course context: {course_context}
    Explain concepts clearly with examples.'''
    
    response = model.generate_content(f"{system_prompt}\n\nStudent: {user_message}")
    return response.text
    """
    
    # TEMPORARY MOCK RESPONSE - Replace with Gemini
    context_info = f"\n\nBased on the course about: {course_context}" if course_context else ""
    
    return f"""As your economics professor, let me explain: {user_message}
    
    This is a fundamental concept in economics. {context_info}
    
    Let me give you a clear example to illustrate this...
    
    [🎯 Hamdane: Replace this entire function with Gemini API call]
    """


def coach_agent(user_message: str, course_context: str = None) -> str:
    """
    💪 COACH AGENT
    Role: Provides exercises, practical applications, mini-essays
    
    TODO HAMDANE: Replace this with Gemini API call
    
    Example Gemini integration:
    
    import google.generativeai as genai
    
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
    model = genai.GenerativeModel('gemini-pro')
    
    system_prompt = f'''You are an economics coach. 
    Course context: {course_context}
    Create practical exercises and guide students through applications.
    Give actionable exercises and feedback.'''
    
    response = model.generate_content(f"{system_prompt}\n\nStudent: {user_message}")
    return response.text
    """
    
    # TEMPORARY MOCK RESPONSE - Replace with Gemini
    context_info = f"\n\nRelated to: {course_context}" if course_context else ""
    
    return f"""Great! Let's practice: {user_message}
    
    Here's an exercise for you: {context_info}
    
    📝 EXERCISE: Analyze the following scenario...
    
    Try to answer these questions:
    1. What economic principle applies?
    2. What would happen if...?
    
    [🎯 Hamdane: Replace this entire function with Gemini API call]
    """


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
    return {"courses": list(COURSES.values())}


@app.get("/api/courses/{course_id}")
async def get_course(course_id: str):
    """Get specific course details"""
    if course_id not in COURSES:
        raise HTTPException(status_code=404, detail="Course not found")
    return COURSES[course_id]


@app.post("/api/chat/professor", response_model=ChatResponse)
async def chat_with_professor(message: ChatMessage):
    """
    Chat with the Professor agent
    The Professor explains concepts and provides theoretical knowledge
    """
    try:
        response = professor_agent(
            user_message=message.message,
            course_context=message.course_context
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
            course_context=message.course_context
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
