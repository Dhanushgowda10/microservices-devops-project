# 🚀 Microservices DevOps Project

![Architecture](https://img.shields.io/badge/Architecture-Microservices-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-brightgreen)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5)
![CI/CD](https://img.shields.io/badge/CI/CD-GitHub%20Actions-2088FF)

**End-to-end DevOps project with microservices, Docker, Kubernetes, CI/CD pipeline, and Azure deployment**

## 📊 Project Overview

This is a production-ready microservices application showcasing DevOps best practices including:

- **Microservices Architecture**: Separate frontend and backend services
- **Containerization**: Docker containers for all services
- **Orchestration**: Kubernetes deployment manifests
- **CI/CD**: Automated pipeline with GitHub Actions
- **Infrastructure as Code**: Terraform for Azure resources
- **Monitoring**: Health checks and status endpoints

## 🏛️ Architecture

```
┌──────────────────────────────────┐
│        User Browser            │
└───────────┬──────────────────────┘
            │
┌───────────┼──────────────────────┐
│  Kubernetes Cluster (AKS)      │
│                                │
│  ┌────────────────────────┐  │
│  │   Frontend Service    │  │
│  │   (Nginx + JS)       │  │
│  └──────────┬─────────────┘  │
│           │ API Calls         │
│  ┌──────────┼─────────────┐  │
│  │   Backend Service     │  │
│  │   (Flask API)        │  │
│  └────────────────────────┘  │
│                                │
└────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Kubernetes cluster (Minikube/AKS)
- kubectl CLI
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Dhanushgowda10/microservices-devops-project.git
cd microservices-devops-project
```

### 2. Local Development with Docker Compose
```bash
# Build and run all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:8080
# Backend API: http://localhost:5000
```

### 3. Deploy to Kubernetes
```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Deploy backend
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml

# Deploy frontend
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

# Check deployment status
kubectl get pods -n devops-app
kubectl get services -n devops-app
```

## 📁 Project Structure

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed file contents and setup instructions.

```
microservices-devops-project/
├── backend/                    # Flask Backend API
│   ├── app.py                 # Main application
│   ├── requirements.txt       # Python dependencies
│   └── Dockerfile             # Backend container
├── frontend/                   # HTML/CSS/JS Frontend
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── Dockerfile             # Frontend container
├── k8s/                       # Kubernetes Manifests
│   ├── namespace.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   └── frontend-service.yaml
├── terraform/                 # Infrastructure as Code
├── .github/workflows/         # CI/CD Pipeline
└── docker-compose.yml         # Local Development
```

## 🔧 Technologies Used

### Backend
- **Python 3.11** - Programming language
- **Flask** - Web framework
- **Gunicorn** - WSGI HTTP server
- **Flask-CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern gradients
- **Vanilla JavaScript** - Dynamic interactions
- **Nginx** - Web server

### DevOps Tools
- **Docker** - Containerization
- **Docker Compose** - Local orchestration
- **Kubernetes** - Production orchestration
- **GitHub Actions** - CI/CD automation
- **Terraform** - Infrastructure as Code
- **Azure** - Cloud platform

## 🛠️ Development

### Running Backend Locally
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Running Frontend Locally
```bash
cd frontend
python -m http.server 8000
# Open http://localhost:8000
```

### Building Docker Images
```bash
# Backend
docker build -t devops-backend:latest ./backend

# Frontend
docker build -t devops-frontend:latest ./frontend
```

## 🐛 Testing

### Health Check
```bash
# Backend health
curl http://localhost:5000/health

# Expected response:
# {"status": "healthy", "service": "backend"}
```

### API Endpoints
```bash
# Get all todos
curl http://localhost:5000/api/todos

# Create a todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test DevOps pipeline"}'

# Delete a todo
curl -X DELETE http://localhost:5000/api/todos/1
```

## ☁️ Cloud Deployment

### Azure Kubernetes Service (AKS)

1. Create AKS cluster:
```bash
az aks create \
  --resource-group devops-rg \
  --name devops-cluster \
  --node-count 2 \
  --enable-addons monitoring \
  --generate-ssh-keys
```

2. Connect to cluster:
```bash
az aks get-credentials --resource-group devops-rg --name devops-cluster
```

3. Deploy application:
```bash
kubectl apply -f k8s/
```

## 📦 CI/CD Pipeline

GitHub Actions automatically:
1. Runs on every push to `main`
2. Builds Docker images
3. Pushes to Docker Hub
4. Deploys to Kubernetes cluster

See `.github/workflows/ci-cd.yml` for pipeline configuration.

## 📊 Features

✅ RESTful API with Flask
✅ Responsive UI with modern design
✅ Docker containerization
✅ Kubernetes deployment
✅ CI/CD automation
✅ Health monitoring
✅ CORS enabled
✅ Production-ready setup

## 📝 License

MIT License - feel free to use this project for learning and interviews!

## 👤 Author

**Dhanush Gowda**
- GitHub: [@Dhanushgowda10](https://github.com/Dhanushgowda10)
- Project: DevOps & Cloud Engineering Portfolio

## 🙏 Acknowledgments

Built as a portfolio project to demonstrate DevOps skills including:
- Microservices architecture
- Container orchestration
- CI/CD automation
- Cloud deployment
- Infrastructure as Code

---

**Star ⭐ this repository if you find it helpful!**
