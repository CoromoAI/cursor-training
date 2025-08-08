// Todo App JavaScript
class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.todoCount = document.getElementById('todoCount');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.emptyState = document.getElementById('emptyState');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        // Add todo
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // Clear completed todos
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());

        // Input validation
        this.todoInput.addEventListener('input', () => {
            this.addBtn.disabled = !this.todoInput.value.trim();
        });
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) {
            this.showError('タスクを入力してください');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.saveTodos();
        this.render();
        this.todoInput.value = '';
        this.addBtn.disabled = true;
        this.todoInput.focus();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    deleteTodo(id) {
        const index = this.todos.findIndex(t => t.id === id);
        if (index > -1) {
            this.todos.splice(index, 1);
            this.saveTodos();
            this.render();
        }
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) return;

        this.todos = this.todos.filter(t => !t.completed);
        this.saveTodos();
        this.render();
        this.showSuccess(`${completedCount}件の完了済みタスクを削除しました`);
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    render() {
        this.renderTodoList();
        this.renderStats();
        this.renderEmptyState();
    }

    renderTodoList() {
        this.todoList.innerHTML = '';
        
        this.todos.forEach(todo => {
            const todoItem = this.createTodoElement(todo);
            this.todoList.appendChild(todoItem);
        });
    }

    createTodoElement(todo) {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoItem.dataset.id = todo.id;

        todoItem.innerHTML = `
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${todo.completed ? 'checked' : ''}
            >
            <span class="todo-text">${this.escapeHtml(todo.text)}</span>
            <button class="todo-delete" title="削除">🗑️</button>
        `;

        // Bind events
        const checkbox = todoItem.querySelector('.todo-checkbox');
        const deleteBtn = todoItem.querySelector('.todo-delete');

        checkbox.addEventListener('change', () => {
            this.toggleTodo(todo.id);
        });

        deleteBtn.addEventListener('click', () => {
            this.deleteTodo(todo.id);
        });

        return todoItem;
    }

    renderStats() {
        const totalCount = this.todos.length;
        const completedCount = this.todos.filter(t => t.completed).length;
        const activeCount = totalCount - completedCount;

        this.todoCount.textContent = `${activeCount} 件のタスク`;
        
        // Show/hide clear completed button
        if (completedCount > 0) {
            this.clearCompletedBtn.style.display = 'block';
        } else {
            this.clearCompletedBtn.style.display = 'none';
        }
    }

    renderEmptyState() {
        if (this.todos.length === 0) {
            this.emptyState.style.display = 'block';
            this.todoList.style.display = 'none';
        } else {
            this.emptyState.style.display = 'none';
            this.todoList.style.display = 'block';
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;

        // Set background color based on type
        if (type === 'error') {
            notification.style.background = '#dc3545';
        } else if (type === 'success') {
            notification.style.background = '#28a745';
        } else {
            notification.style.background = '#17a2b8';
        }

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
}); 