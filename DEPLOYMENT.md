# Deployment Guide

This guide covers deploying PharmaIntel API to various platforms.

## Table of Contents

- [Google Cloud Run](#google-cloud-run)
- [Heroku](#heroku)
- [AWS ECS](#aws-ecs)
- [Docker](#docker)
- [Kubernetes](#kubernetes)

## Prerequisites

- Docker installed
- Cloud provider account
- DRUGBANK_API_KEY obtained from [DrugBank](https://go.drugbank.com/api)

## Google Cloud Run

### Setup

1. **Install Google Cloud SDK**

   ```bash
   # Follow instructions at https://cloud.google.com/sdk/docs/install
   ```

2. **Authenticate**

   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **Enable required services**

   ```bash
   gcloud services enable run.googleapis.com
   gcloud services enable artifactregistry.googleapis.com
   gcloud services enable secretmanager.googleapis.com
   ```

4. **Create Artifact Registry repository**

   ```bash
   gcloud artifacts repositories create pharmaintel \
     --repository-format=docker \
     --location=europe-west1 \
     --description="PharmaIntel API images"
   ```

5. **Store API key in Secret Manager**
   ```bash
   echo -n "your-drugbank-api-key" | \
     gcloud secrets create DRUGBANK_API_KEY --data-file=-
   ```

### Manual Deployment

```bash
# Build and push image
gcloud builds submit --tag europe-west1-docker.pkg.dev/YOUR_PROJECT_ID/pharmaintel/pharmaintel-api:v1.0.0

# Deploy to Cloud Run
gcloud run deploy pharmaintel-api \
  --image europe-west1-docker.pkg.dev/YOUR_PROJECT_ID/pharmaintel/pharmaintel-api:v1.0.0 \
  --region europe-west1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars PORT=3000 \
  --set-secrets DRUGBANK_API_KEY=DRUGBANK_API_KEY:latest \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --min-instances 0
```

### Automated Deployment (GitHub Actions)

See `.github/workflows/deploy-cloudrun.yml`. Configure these GitHub secrets:

- `GCP_PROJECT_ID`: Your GCP project ID
- `GCP_REGION`: Deployment region (e.g., europe-west1)
- `GCP_SA_KEY`: Service account JSON key (full JSON credentials file content)

Deploy by pushing a tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## Heroku

### Setup

1. **Install Heroku CLI**

   ```bash
   # https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login**

   ```bash
   heroku login
   ```

3. **Create app**
   ```bash
   heroku create your-app-name
   ```

### Deployment

```bash
# Set environment variables
heroku config:set DRUGBANK_API_KEY=your_api_key

# Deploy
git push heroku main

# Open app
heroku open

# View logs
heroku logs --tail
```

### Using Container Registry

```bash
# Login to Heroku Container Registry
heroku container:login

# Build and push
heroku container:push web -a your-app-name

# Release
heroku container:release web -a your-app-name
```

## AWS ECS

### Prerequisites

- AWS CLI configured
- ECR repository created
- ECS cluster created

### Deployment

1. **Build and push to ECR**

   ```bash
   # Authenticate Docker to ECR
   aws ecr get-login-password --region us-east-1 | \
     docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

   # Build and tag
   docker build -t pharmaintel-api .
   docker tag pharmaintel-api:latest ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/pharmaintel-api:latest

   # Push
   docker push ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/pharmaintel-api:latest
   ```

2. **Create task definition** (task-definition.json)

   ```json
   {
     "family": "pharmaintel-api",
     "networkMode": "awsvpc",
     "requiresCompatibilities": ["FARGATE"],
     "cpu": "256",
     "memory": "512",
     "containerDefinitions": [
       {
         "name": "pharmaintel-api",
         "image": "ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/pharmaintel-api:latest",
         "portMappings": [
           {
             "containerPort": 3000,
             "protocol": "tcp"
           }
         ],
         "environment": [
           {
             "name": "PORT",
             "value": "3000"
           }
         ],
         "secrets": [
           {
             "name": "DRUGBANK_API_KEY",
             "valueFrom": "arn:aws:secretsmanager:REGION:ACCOUNT_ID:secret:drugbank-api-key"
           }
         ]
       }
     ]
   }
   ```

3. **Deploy service**

   ```bash
   # Register task definition
   aws ecs register-task-definition --cli-input-json file://task-definition.json

   # Create or update service
   aws ecs create-service \
     --cluster your-cluster \
     --service-name pharmaintel-api \
     --task-definition pharmaintel-api \
     --desired-count 2 \
     --launch-type FARGATE \
     --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
   ```

## Docker

### Local Development

```bash
# Build
docker build -t pharmaintel-api .

# Run
docker run -p 3000:3000 -e DRUGBANK_API_KEY=your_key pharmaintel-api

# Or use docker-compose
docker-compose up -d
```

### Docker Compose (Production-like)

```yaml
version: '3.9'
services:
  pharmaintel-api:
    build: .
    ports:
      - '3000:3000'
    environment:
      - PORT=3000
      - NODE_ENV=production
      - DRUGBANK_API_KEY=${DRUGBANK_API_KEY}
    restart: unless-stopped
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

## Kubernetes

### Deployment manifest (k8s-deployment.yaml)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: pharmaintel-secrets
type: Opaque
stringData:
  drugbank-api-key: YOUR_API_KEY_HERE
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pharmaintel-api
  labels:
    app: pharmaintel-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: pharmaintel-api
  template:
    metadata:
      labels:
        app: pharmaintel-api
    spec:
      containers:
        - name: pharmaintel-api
          image: your-registry/pharmaintel-api:v1.0.0
          ports:
            - containerPort: 3000
          env:
            - name: PORT
              value: '3000'
            - name: NODE_ENV
              value: 'production'
            - name: DRUGBANK_API_KEY
              valueFrom:
                secretKeyRef:
                  name: pharmaintel-secrets
                  key: drugbank-api-key
          resources:
            requests:
              memory: '256Mi'
              cpu: '250m'
            limits:
              memory: '512Mi'
              cpu: '500m'
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
---
# .env.example - Copy this to .env and replace with real values

# Server Configuration
PORT=3000
NODE_ENV=development

# API Keys (Required)
# Get your DrugBank API key from: https://go.drugbank.com/api
DRUGBANK_API_KEY=replace_with_real_key

# Optional: Additional Configuration
# LOG_LEVEL=info
# CORS_ORIGIN=*
---
apiVersion: v1
kind: Service
metadata:
  name: pharmaintel-api-service
spec:
  selector:
    app: pharmaintel-api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

### Deploy

```bash
# Apply configuration
next.js apply -f k8s-deployment.yaml

# Check status
next.js get npm
next.js get services

# View logs
vercel logs -f deployment/pharmaintel-api
```

## Post-Deployment

### Verify Deployment

```bash
# Health check
curl https://your-app-url.com/health

# Test endpoints
curl https://your-app-url.com/api/recalls?ingredient=aspirin

curl -X POST https://your-app-url.com/api/interactions \
  -H "Content-Type: application/json" \
  -d '{"drugs":["aspirin","ibuprofen"]}'
```

### Monitoring

1. **Set up logging** - Configure centralized logging (CloudWatch, Stackdriver, etc.)
2. **Set up metrics** - Monitor response times, error rates, request volume
3. **Set up alerts** - Alert on high error rates, slow responses, or downtime
4. **Health checks** - Configure automated health checks

### Security Checklist

- ✅ API keys stored in secure secret management
- ✅ HTTPS enabled
- ✅ Rate limiting configured
- ✅ CORS properly configured
- ✅ Security headers enabled (Helmet)
- ✅ Regular security audits scheduled
- ✅ Dependency updates automated (Dependabot)

## Troubleshooting

### Container won't start

- Check logs: `docker logs container-id`
- Verify environment variables are set
- Check port availability

### API returns 502 errors

- Verify DRUGBANK_API_KEY is valid
- Check external API availability
- Review error logs

### High latency

- Check external API response times
- Review rate limiting configuration
- Scale up instances if needed

### Memory issues

- Monitor memory usage
- Adjust container memory limits
- Check for memory leaks

## Support

For deployment issues, please open an issue on GitHub.
