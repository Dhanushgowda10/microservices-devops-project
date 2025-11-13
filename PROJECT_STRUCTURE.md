# Complete Project Structure & Setup Guide

## 📁 Project Directory Structure

```
microservices-devops-project/
├── backend/                    # Flask Backend API
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/                   # HTML/CSS/JS Frontend
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── Dockerfile
├── k8s/                       # Kubernetes Manifests
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   └── namespace.yaml
├── terraform/                 # Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── .github/
│   └── workflows/
│       └── ci-cd.yml         # GitHub Actions Pipeline
├── docker-compose.yml         # Local Development
├── .gitignore
└── README.md
```

## 🚀 Quick Start - Next Steps

### 1. Clone Your Repository
```bash
git clone https://github.com/Dhanushgowda10/microservices-devops-project.git
cd microservices-devops-project
```

### 2. Create All Project Files Locally

Follow the structure above and create files with the content provided in sections below.

---

## 📝 File Contents

### backend/requirements.txt
```
Flask==3.0.0
flask-cors==4.0.0
gunicorn==21.2.0
```

### backend/Dockerfile
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

EXPOSE 5000

CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
```

### frontend/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevOps Todo App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>🚀 DevOps Todo Application</h1>
        <p class="subtitle">Microservices | Docker | Kubernetes | CI/CD</p>
        
        <div class="input-group">
            <input type="text" id="todoInput" placeholder="Enter a new task...">
            <button onclick="addTodo()">Add Task</button>
        </div>
        
        <div id="todoList" class="todo-list"></div>
        
        <div class="footer">
            <p>Backend Status: <span id="status" class="status-indicator">●</span></p>
        </div>
    </div>
    
    <script src="app.js"></script>
</body>
</html>
```

### frontend/style.css
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.container {
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    max-width: 600px;
    width: 100%;
}

h1 {
    color: #667eea;
    margin-bottom: 10px;
    text-align: center;
}

.subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 30px;
    font-size: 14px;
}

.input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

input[type="text"] {
    flex: 1;
    padding: 15px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 16px;
    transition: border-color 0.3s;
}

input[type="text"]:focus {
    outline: none;
    border-color: #667eea;
}

button {
    padding: 15px 30px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background: #5568d3;
}

.todo-list {
    margin-top: 20px;
}

.todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 10px;
    margin-bottom: 10px;
    transition: transform 0.2s;
}

.todo-item:hover {
    transform: translateX(5px);
}

.delete-btn {
    padding: 8px 15px;
    background: #ff4757;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

.delete-btn:hover {
    background: #ff3838;
}

.footer {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #e0e0e0;
    text-align: center;
    color: #666;
}

.status-indicator {
    font-size: 20px;
    color: #2ecc71;
}
```

### frontend/app.js
```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : '/api';

let todos = [];

// Check backend health
async function checkHealth() {
    try {
        const response = await fetch(`${API_URL.replace('/api', '')}/health`);
        const data = await response.json();
        document.getElementById('status').style.color = '#2ecc71';
    } catch (error) {
        document.getElementById('status').style.color = '#ff4757';
        console.error('Backend health check failed:', error);
    }
}

// Fetch all todos
async function fetchTodos() {
    try {
        const response = await fetch(`${API_URL}/todos`);
        todos = await response.json();
        renderTodos();
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

// Add new todo
async function addTodo() {
    const input = document.getElementById('todoInput');
    const title = input.value.trim();
    
    if (!title) return;
    
    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });
        
        const newTodo = await response.json();
        todos.push(newTodo);
        input.value = '';
        renderTodos();
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

// Delete todo
async function deleteTodo(id) {
    try {
        await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE'
        });
        todos = todos.filter(t => t.id !== id);
        renderTodos();
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

// Render todos
function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
        todoList.innerHTML = '<p style="text-align:center;color:#999;padding:20px;">No tasks yet. Add one above!</p>';
        return;
    }
    
    todos.forEach(todo => {
        const div = document.createElement('div');
        div.className = 'todo-item';
        div.innerHTML = `
            <span>${todo.title}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(div);
    });
}

// Allow Enter key to add todo
document.getElementById('todoInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

// Initialize
checkHealth();
fetchTodos();
setInterval(checkHealth, 30000); // Check health every 30s
```

### frontend/Dockerfile
```dockerfile
FROM nginx:alpine

COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend
    ports:
      - "8080:80"
    depends_on:
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

---

## 🔄 Continue to Next Files

This document continues in the next file. After creating all these files:
1. Test locally with `docker-compose up`
2. Create Kubernetes manifests
3. Set up CI/CD pipeline
4. Deploy to Azure

See README.md for complete instructions!
