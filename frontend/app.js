// API Configuration
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : '/api';

let todos = [];

// Check backend health status
async function checkHealth() {
    try {
        const response = await fetch(`${API_URL.replace('/api', '')}/health`);
        const data = await response.json();
        document.getElementById('status').style.color = '#2ecc71';
        console.log('Backend is healthy:', data);
    } catch (error) {
        document.getElementById('status').style.color = '#ff4757';
        console.error('Backend health check failed:', error);
    }
}

// Fetch all todos from backend
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
    
    if (!title) {
        alert('Please enter a task!');
        return;
    }
    
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
        alert('Failed to add task. Check backend connection.');
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

// Render todos to DOM
function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
        todoList.innerHTML = '<p style="text-align:center;color:#999;padding:20px;">No tasks yet. Add one above! 🚀</p>';
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
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initialize app
checkHealth();
fetchTodos();
setInterval(checkHealth, 30000); // Check health every 30 seconds
