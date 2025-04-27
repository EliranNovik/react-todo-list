import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')
  const [theme, setTheme] = useState('light')

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setTodos([...todos, { 
      id: Date.now(), 
      text: input, 
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium'
    }])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const setPriority = (id, priority) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, priority } : todo
    ))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444'
      case 'medium': return '#ffbb33'
      case 'low': return '#00C851'
      default: return '#33b5e5'
    }
  }

  return (
    <div className={`app ${theme}`}>
      <div className="header">
        <h1>Productive Todo List</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button type="submit" className="add-button">
          <span className="plus-icon">+</span> Add Task
        </button>
      </form>

      <div className="filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <div className="stats">
        <span>{filteredTodos.length} tasks remaining</span>
        <span>{todos.filter(t => t.completed).length} completed</span>
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              <div className="priority-buttons">
                <button
                  className={`priority-btn ${todo.priority === 'low' ? 'active' : ''}`}
                  onClick={() => setPriority(todo.id, 'low')}
                  style={{ backgroundColor: getPriorityColor('low') }}
                >
                  Low
                </button>
                <button
                  className={`priority-btn ${todo.priority === 'medium' ? 'active' : ''}`}
                  onClick={() => setPriority(todo.id, 'medium')}
                  style={{ backgroundColor: getPriorityColor('medium') }}
                >
                  Medium
                </button>
                <button
                  className={`priority-btn ${todo.priority === 'high' ? 'active' : ''}`}
                  onClick={() => setPriority(todo.id, 'high')}
                  style={{ backgroundColor: getPriorityColor('high') }}
                >
                  High
                </button>
              </div>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
