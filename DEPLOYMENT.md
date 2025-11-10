# EconoMind - Deployment Guide for Cloud Run with ADK

## Prerequisites

1. Google Cloud Project with billing enabled
2. `gcloud` CLI installed and authenticated
3. Cloud Run API enabled
4. Vertex AI API enabled

## Setup Steps

### 1. Set Environment Variables

```bash
# Set your project ID
export PROJECT_ID="your-project-id"
export REGION="europe-west1"  # Required by hackathon rules

# Configure gcloud
gcloud config set project $PROJECT_ID
```

### 2. Enable Required APIs

```bash
# Enable Cloud Run
gcloud services enable run.googleapis.com

# Enable Vertex AI (required for ADK)
gcloud services enable aiplatform.googleapis.com

# Enable Container Registry
gcloud services enable containerregistry.googleapis.com
```

### 3. Build and Deploy

#### Option A: Using Cloud Build (Recommended)

```bash
# Build and push the container
gcloud builds submit --tag gcr.io/$PROJECT_ID/economind-backend

# Deploy to Cloud Run
gcloud run deploy economind-backend \
  --image gcr.io/$PROJECT_ID/economind-backend \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars GCP_PROJECT_ID=$PROJECT_ID,GCP_LOCATION=$REGION \
  --memory 1Gi \
  --cpu 1 \
  --timeout 300
```

#### Option B: Using Docker locally

```bash
# Build the image
docker build -t gcr.io/$PROJECT_ID/economind-backend .

# Push to Google Container Registry
docker push gcr.io/$PROJECT_ID/economind-backend

# Deploy
gcloud run deploy economind-backend \
  --image gcr.io/$PROJECT_ID/economind-backend \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars GCP_PROJECT_ID=$PROJECT_ID,GCP_LOCATION=$REGION
```

### 4. Verify Deployment

```bash
# Get the service URL
gcloud run services describe economind-backend \
  --platform managed \
  --region $REGION \
  --format 'value(status.url)'

# Test the health endpoint
curl https://your-service-url/

# Test the courses endpoint
curl https://your-service-url/api/courses

# Test the Professor agent
curl -X POST https://your-service-url/api/chat/professor \
  -H "Content-Type: application/json" \
  -d '{"message": "What is GDP?"}'
```

## Project Structure

```
economind/
├── main.py              # FastAPI application (UPDATED - uses ADK)
├── agents.py            # ADK agent definitions (NEW)
├── courses_data.py      # Course content
├── requirements.txt     # Python dependencies (UPDATED - includes ADK)
├── Dockerfile          # Container configuration
└── .env.example        # Environment variables template
```

## Key Changes from Previous Version

### 1. Dependencies (requirements.txt)
- ✅ Added `google-adk` - Agent Development Kit
- ✅ Added `google-genai` - Gemini client for ADK
- ✅ Added `google-cloud-aiplatform` - Vertex AI integration
- ❌ Removed direct `google-generativeai` usage
### 2. Updated agents.py File
- ✅ Defines `professor` and `coach` agents using ADK logic
- ✅ Uses Vertex AI client (no API key needed in production)
- ✅ Includes context-aware prompt building

### 3. Updated main.py
- ✅ Imports agents from `agents.py`
- ✅ Uses `run_professor()` and `run_coach()` instead of direct API calls
- ✅ Version bumped to 2.0.0

## Hackathon Requirements Checklist

- ✅ **Cloud Run**: Serverless deployment on Cloud Run
- ✅ **AI Agents Category**: Uses Google ADK with two specialized agents
- ✅ **Region**: europe-west1 (configurable)
- ✅ **NEW Application**: Built specifically for the hackathon
- ✅ **Bonus Points**:
  - Uses Gemini models via ADK
  - Multi-service architecture (frontend + backend)
## Testing Locally

```bash
# Install dependencies
pip install -r requirements.txt

# Set environment variables
export GCP_PROJECT_ID="your-project-id"
export GCP_LOCATION="europe-west1"

# Run the server
python main.py

# Test in another terminal
curl http://localhost:8080/
curl http://localhost:8080/api/courses
```

## Troubleshooting

### Authentication Issues
If you see authentication errors, ensure:
1. You're authenticated with gcloud: `gcloud auth login`
2. Application Default Credentials are set: `gcloud auth application-default login`
3. Your service account has the necessary permissions

### Memory Issues
If the service runs out of memory:
```bash
gcloud run services update economind-backend \
  --memory 2Gi \
  --region $REGION
```

### Timeout Issues
If requests timeout:
```bash
gcloud run services update economind-backend \
  --timeout 300 \
  --region $REGION
```

## Next Steps

1. **Update Frontend**: Update your React app's API base URL to point to the Cloud Run service
2. **Add Monitoring**: Set up Cloud Logging and Cloud Monitoring
3. **Add Tools**: Enhance agents with custom tools (ADK feature)
4. **Add Memory**: Implement conversation memory for agents
5. **Deploy Frontend**: Deploy React app to Cloud Run or Firebase Hosting

## Cost Optimization

- Cloud Run charges only for actual usage (pay-per-request)
- First 2 million requests per month are free
- Vertex AI pricing applies for Gemini API calls
- Use $100 Google Cloud credits from hackathon registration

## Support

For issues or questions:
- ADK Documentation: https://google.github.io/adk-docs/
- Cloud Run Documentation: https://cloud.google.com/run/docs
- Hackathon Discord: Join the #cloudrun-hackathon channel