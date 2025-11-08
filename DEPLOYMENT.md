# 🚀 Quick Deployment Guide

## ⏱️ Timeline: 2 Days

### Day 1 - TODAY (Setup & Integration)

#### Morning (3-4 hours)
1. **Setup Google Cloud** (30 min)
   ```bash
   # Install gcloud CLI if needed
   # Login to Google Cloud
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. **Get Gemini API Key** (15 min)
   - Visit: https://makersuite.google.com/app/apikey
   - Create API key
   - Save it securely

3. **Integrate Gemini in Backend** (2-3 hours)
   - Follow instructions in README.md
   - Update `backend/main.py` with Gemini calls
   - Test locally with:
     ```bash
     cd backend
     export GEMINI_API_KEY="your-key"
     python main.py
     ```
   - Test endpoints:
     ```bash
     curl -X POST http://localhost:8080/api/chat/professor \
       -H "Content-Type: application/json" \
       -d '{"message": "Explain supply and demand"}'
     ```

#### Afternoon (3-4 hours)
4. **Test Full App Locally** (1 hour)
   - Run backend (terminal 1):
     ```bash
     cd backend
     python main.py
     ```
   - Run frontend (terminal 2):
     ```bash
     cd frontend
     npm run dev
     ```
   - Test both agents in browser

5. **Deploy Backend to Cloud Run** (1 hour)
   ```bash
   cd backend
   gcloud run deploy economind-backend \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars GEMINI_API_KEY="your-key"
   
   # Note the service URL!
   ```

6. **Deploy Frontend to Cloud Run** (1 hour)
   ```bash
   cd frontend
   
   # Update .env with backend URL
   echo "VITE_API_URL=https://your-backend-url.run.app" > .env
   
   # Deploy
   gcloud run deploy economind-frontend \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

#### Evening (2-3 hours)
7. **Test Deployed App** (30 min)
   - Visit your frontend URL
   - Test all features
   - Fix any bugs

8. **Create GitHub Repository** (30 min)
   ```bash
   git init
   git add .
   git commit -m "Initial commit: EconoMind for Cloud Run Hackathon"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/economind.git
   git push -u origin main
   ```

9. **Start Architecture Diagram** (1 hour)
   - Use tools like: draw.io, Excalidraw, or Google Slides
   - Show: Frontend → Backend → Gemini
   - Include Cloud Run services

### Day 2 - TOMORROW (Video & Submission)

#### Morning (4-5 hours)
10. **Record Demo Video** (2-3 hours)
    - Script your video (see script below)
    - Record with: OBS Studio, Loom, or phone
    - Show:
      - Landing page
      - Professor chat demo
      - Coach chat demo
      - Course selection
    - Max 3 minutes!

11. **Edit Video** (1-2 hours)
    - Add intro/outro
    - Add text overlays for features
    - Upload to YouTube (Public or Unlisted)

#### Afternoon (3-4 hours - BEFORE 5PM PT!)
12. **Complete Documentation** (1 hour)
    - Finish README
    - Add screenshots
    - Write clear setup instructions

13. **Finalize Architecture Diagram** (30 min)
    - Export as PNG/PDF
    - Make it clear and professional

14. **Submit on Devpost** (1-2 hours)
    - Create submission
    - Fill all required fields:
      - ✅ Project description
      - ✅ GitHub repo link
      - ✅ Demo video link
      - ✅ Live demo URL (frontend)
      - ✅ Architecture diagram
      - ✅ Built with (Cloud Run, Gemini, etc.)
    - Select category: **AI Agents**
    - Submit BEFORE 5PM PT!

15. **Bonus Points** (if time allows)
    - Write blog post on Medium/Dev.to
    - Post on LinkedIn/Twitter with #CloudRunHackathon

---

## 🎬 Demo Video Script (3 minutes)

### Part 1: Problem (0:00-0:30)
"Learning economics can be challenging. Students need both theoretical understanding AND practical application. That's why I built EconoMind."

### Part 2: Solution (0:30-1:00)
"EconoMind uses two specialized AI agents powered by Google Gemini:
- The Professor explains concepts clearly
- The Coach provides hands-on exercises
Both deployed on Google Cloud Run for scalability."

### Part 3: Demo (1:00-2:15)
- Show landing page (10 sec)
- Demo Professor explaining supply/demand (30 sec)
- Demo Coach giving practice exercise (30 sec)
- Show course selection (15 sec)

### Part 4: Technical (2:15-2:50)
"Architecture:
- React frontend on Cloud Run
- FastAPI backend on Cloud Run
- Two Gemini AI agents
- Fully serverless and scalable"

### Part 5: Conclusion (2:50-3:00)
"EconoMind makes economics education interactive, personalized, and accessible. Thank you!"

---

## ✅ Submission Checklist

Before submitting, verify:
- [ ] Backend deployed on Cloud Run
- [ ] Frontend deployed on Cloud Run
- [ ] Both services working together
- [ ] GitHub repo is public
- [ ] README is complete
- [ ] Demo video uploaded (YouTube)
- [ ] Video is < 3 minutes
- [ ] Architecture diagram created
- [ ] All code is documented
- [ ] Devpost submission filled out
- [ ] Category selected: AI Agents
- [ ] Submitted BEFORE 5PM PT Nov 10

---

## 🆘 Troubleshooting

**Backend won't start:**
```bash
# Check Python version
python --version  # Should be 3.11+

# Reinstall dependencies
pip install -r requirements.txt --break-system-packages
```

**Frontend won't build:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Cloud Run deployment fails:**
```bash
# Check you're logged in
gcloud auth list

# Check project is set
gcloud config get-value project

# Check region is correct
gcloud config set run/region us-central1
```

**Gemini API not working:**
- Check API key is correct
- Verify it's set as environment variable
- Check API quotas in Google Cloud Console

---

## 💡 Tips

1. **Test locally first** - Make sure everything works before deploying
2. **Keep it simple** - Working features > broken complexity
3. **Document as you go** - Don't leave it for last
4. **Record video early** - You can always re-record if needed
5. **Submit early** - Don't wait until the last minute!

---

Good luck! 🚀
