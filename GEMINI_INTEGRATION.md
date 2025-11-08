# 🤖 Gemini Integration Guide

## 🎯 For Hamdane: Complete Integration Steps

### Step 1: Install Gemini SDK

In `backend/requirements.txt`, uncomment:
```
google-generativeai==0.3.1
```

Then install:
```bash
cd backend
pip install -r requirements.txt --break-system-packages
```

### Step 2: Get API Key

1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### Step 3: Update main.py

Replace the two agent functions in `backend/main.py`:

```python
import google.generativeai as genai
import os

# Configure Gemini at the top of the file (after imports)
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Replace professor_agent function
def professor_agent(user_message: str, course_context: str = None) -> str:
    """
    🎓 PROFESSOR AGENT - Powered by Gemini
    Role: Explains concepts clearly with examples
    """
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        # Build context-aware prompt
        context = f"\n\nCourse Context:\n{course_context}" if course_context else ""
        
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

Student Question: {user_message}

Provide a clear, educational response:"""

        response = model.generate_content(system_prompt)
        return response.text
        
    except Exception as e:
        return f"I apologize, but I'm having trouble processing that. Could you rephrase your question? (Error: {str(e)})"


# Replace coach_agent function
def coach_agent(user_message: str, course_context: str = None) -> str:
    """
    💪 COACH AGENT - Powered by Gemini
    Role: Provides practical exercises and training
    """
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        # Build context-aware prompt
        context = f"\n\nCourse Context:\n{course_context}" if course_context else ""
        
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

Student Request: {user_message}

Provide a practical, exercise-focused response:"""

        response = model.generate_content(system_prompt)
        return response.text
        
    except Exception as e:
        return f"Oops! I'm having trouble creating that exercise. Let's try something else! (Error: {str(e)})"
```

### Step 4: Test Locally

```bash
# Set your API key
export GEMINI_API_KEY="your-api-key-here"

# Run the backend
cd backend
python main.py
```

Test with curl:
```bash
# Test Professor
curl -X POST http://localhost:8080/api/chat/professor \
  -H "Content-Type: application/json" \
  -d '{"message": "What is supply and demand?"}'

# Test Coach
curl -X POST http://localhost:8080/api/chat/coach \
  -H "Content-Type: application/json" \
  -d '{"message": "Give me an exercise on inflation"}'
```

## 🎨 Advanced: Customizing Agent Personalities

### Making the Professor More Formal

```python
system_prompt = f"""You are Professor Thompson, a distinguished economics professor.

Your personality:
- Formal but approachable
- Use academic terminology (but explain it)
- Reference economic theories and models
- Cite historical examples
- Structured teaching approach
...
```

### Making the Coach More Energetic

```python
system_prompt = f"""You are Coach Sarah, an energetic economics trainer!

Your personality:
- Enthusiastic and motivating
- Use sports/fitness metaphors
- Celebrate student progress
- Challenge students to "level up"
- Conversational and friendly
...
```

## 📊 Optimizing Prompts for Better Responses

### Tips for Professor Agent:
1. **Be specific about explanation style**: "Step-by-step", "Use analogies", "Visual examples"
2. **Set response length**: "Explain in 200 words"
3. **Request structure**: "First explain the concept, then give an example"
4. **Specify audience**: "Explain as if to a college freshman"

### Tips for Coach Agent:
1. **Request action items**: "Create 3 practice questions"
2. **Ask for scenarios**: "Give a real-world case study"
3. **Request feedback format**: "Provide hints, not direct answers"
4. **Encourage creativity**: "Create an engaging exercise"

## 🔧 Handling Common Issues

### Issue: Responses too long
```python
# Add to system_prompt:
"Keep your response under 300 words."
```

### Issue: Too technical
```python
# Add to system_prompt:
"Use simple language suitable for beginners. Avoid jargon."
```

### Issue: Not practical enough (Coach)
```python
# Add to system_prompt:
"Always include at least one concrete exercise or practice question."
```

### Issue: API rate limits
```python
# Add retry logic:
import time

def coach_agent(user_message: str, course_context: str = None) -> str:
    max_retries = 3
    for attempt in range(max_retries):
        try:
            model = genai.GenerativeModel('gemini-pro')
            # ... rest of code
            return response.text
        except Exception as e:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
                continue
            return "I'm having trouble right now. Please try again!"
```

## 🚀 Deploying with Gemini

When deploying to Cloud Run:

```bash
gcloud run deploy economind-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY="your-actual-api-key"
```

**Important**: Keep your API key secure! For production:
1. Use Google Secret Manager
2. Never commit keys to Git
3. Use environment variables

## 🧪 Testing Different Gemini Models

You can experiment with different models:

```python
# Faster, cheaper (recommended for hackathon)
model = genai.GenerativeModel('gemini-1.5-flash')

# More capable, slower
model = genai.GenerativeModel('gemini-1.5-pro')

# Standard (good balance)
model = genai.GenerativeModel('gemini-pro')
```

## 📝 Example Conversations

### Professor Example:
**Student**: "What causes inflation?"

**Expected Response**: 
"Inflation occurs when there's a general increase in prices across the economy. Think of it like too much money chasing too few goods. 

There are three main causes:

1. **Demand-Pull Inflation**: When demand exceeds supply (like everyone wanting to buy houses during low interest rates)

2. **Cost-Push Inflation**: When production costs rise (like oil prices increasing, making everything more expensive)

3. **Built-In Inflation**: When workers expect inflation and demand higher wages, creating a cycle

Real example: During 2021-2022, we saw..."

### Coach Example:
**Student**: "Give me an exercise on inflation"

**Expected Response**:
"Great! Let's practice with a real scenario! 📊

**Exercise**: The Grocery Store Challenge

Imagine you're a store manager. Last year:
- Bread: $2.00
- Milk: $3.50
- Eggs: $4.00

This year, your supplier raised prices by 10%.

**Your Tasks**:
1. Calculate new prices
2. If customers can only spend $20/week on these items, what happens to demand?
3. What strategies could you use?

Try solving this, then I'll give you feedback! 💪"

## ✅ Final Checklist

Before deploying:
- [ ] Gemini SDK installed
- [ ] API key obtained
- [ ] Both agents updated with Gemini
- [ ] Tested locally
- [ ] Error handling added
- [ ] Prompts optimized
- [ ] Ready to deploy!

---

Good luck with the integration! 🚀
