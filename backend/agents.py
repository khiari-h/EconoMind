"""
EconoMind AI Agents - Built with Google ADK
Cloud Run Hackathon 2025 - AI Agents Category
"""

from google.genai import Client
import os
from typing import List, Optional

# Initialize the Gemini client with Vertex AI
def get_client():
    """Initialize and return the Gemini client for ADK agents"""
    project_id = os.environ.get("GCP_PROJECT_ID", "vivid-course-477805-n0")
    # CRUCIAL FIX: Force the stable US-CENTRAL1 region for the Gemini API
    GEMINI_LOCATION = "us-central1"
    
    return Client(
        vertexai=True,
        project=project_id,
        location=GEMINI_LOCATION
        )

# Create the client instance
client = get_client()

# ==================== PROFESSOR AGENT ====================

professor_base_instruction = """You are an expert economics professor with years of teaching experience.

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
"""

# ==================== COACH AGENT ====================

coach_base_instruction = """You are an economics coach focused on practical application and skill-building.

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
"""

# ==================== AGENT HELPER FUNCTIONS ====================

def build_context_prompt(
    user_message: str,
    course_context: Optional[str] = None,
    viewed_courses: Optional[List[str]] = None
) -> str:
    """Build a context-aware prompt for the agents"""
    
    prompt_parts = [user_message]
    
    if course_context:
        prompt_parts.append(f"\n\n[Course Context]\n{course_context}")
    
    if viewed_courses and len(viewed_courses) > 0:
        courses_str = ", ".join(viewed_courses)
        prompt_parts.append(
            f"\n\n[Student History]\nThe student has already studied: {courses_str}. "
            "You can reference these topics if relevant."
        )
    
    return "\n".join(prompt_parts)


def run_professor(
    user_message: str,
    course_context: Optional[str] = None,
    viewed_courses: Optional[List[str]] = None
) -> str:
    """
    Run the Professor agent with context
    
    Args:
        user_message: The student's question
        course_context: Current course content for reference
        viewed_courses: List of courses the student has viewed
        
    Returns:
        Professor's response as a string
    """
    try:
        prompt = build_context_prompt(user_message, course_context, viewed_courses)
        # FIX: Direct call to the Gemini model for more reliability
        full_prompt = f"{professor_base_instruction}\n\n{prompt}"
        # FINAL CODE FIX: Correct model and force US-CENTRAL1 region
        # 1. Use the official model name: gemini-2.0-flash
        # 2. Use the canonical publisher path: publishers/google/models/
        # 3. Use the 'location' parameter to force the call to us-central1 (bypassing the region issue)
        model_name = "publishers/google/models/gemini-2.0-flash"

        response = client.models.generate_content(
            model=model_name,
            contents=[full_prompt]
        ).text
        return response
    except Exception as e:
        return f"I apologize, but I'm having trouble processing that. Could you rephrase your question? (Error: {str(e)})"


def run_coach(
    user_message: str,
    course_context: Optional[str] = None,
    viewed_courses: Optional[List[str]] = None
) -> str:
    """
    Run the Coach agent with context
    
    Args:
        user_message: The student's request
        course_context: Current course content for reference
        viewed_courses: List of courses the student has practiced
        
    Returns:
        Coach's response as a string
    """
    try:
        prompt = build_context_prompt(user_message, course_context, viewed_courses)
        # FIX: Direct call to the Gemini model for more reliability
        full_prompt = f"{coach_base_instruction}\n\n{prompt}"
        # FINAL CODE FIX: Correct model and force US-CENTRAL1 region
        # 1. Use the official model name: gemini-2.0-flash
        # 2. Use the canonical publisher path: publishers/google/models/
        # 3. Use the 'location' parameter to force the call to us-central1 (bypassing the region issue)
        model_name = "publishers/google/models/gemini-2.0-flash"

        response = client.models.generate_content(
            model=model_name,
            contents=[full_prompt]
        ).text
        return response
    except Exception as e:
        return f"Oops! I'm having trouble creating that exercise. Let's try something else! (Error: {str(e)})"