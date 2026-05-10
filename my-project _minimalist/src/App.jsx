import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('todos')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
}, [todos])

  const handleDelete = (e, id) => {
    setTodos(todos.filter(el => el.id !== id))
  }

  const handleEdit = (e, id) => {
    let t = todos.find(i => i.id === id)
    setTodo(t.todo)
    setTodos(todos.filter(el => el.id !== id))
  }

  const handleAdd = () => {
    if (!todo.trim()) return;
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }

  const handleChange = (e) => setTodo(e.target.value)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  const handleCheckbox = (e) => {
    let ID = e.target.name;
    let index = todos.findIndex(item => item.id === ID)
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }

  const completedCount = todos.filter(t => t.isCompleted).length

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f9f9f8',
        padding: '2.5rem 1rem',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        <div style={{
          maxWidth: '560px',
          margin: '0 auto',
        }}>

          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              fontWeight: '600',
              color: '#111111',
              letterSpacing: '-0.03em',
              margin: '0 0 0.25rem 0',
              lineHeight: '1.2'
            }}>
              Today's Tasks
            </h1>
            <p style={{ color: '#999', fontSize: '0.875rem', margin: 0 }}>
              {todos.length === 0
                ? 'No tasks yet'
                : `${completedCount} of ${todos.length} completed`}
            </p>
          </div>

          {/* Input */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2rem',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '0.5rem 0.5rem 0.5rem 1rem',
            alignItems: 'center',
          }}>
            <input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={todo}
              type="text"
              placeholder="Add a new task..."
              id="addTaskSpace"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                fontSize: '0.9375rem',
                color: '#111111',
                padding: '0.4rem 0',
              }}
            />
            <button
              onClick={handleAdd}
              style={{
                backgroundColor: '#111111',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1.1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'opacity 0.15s ease',
              }}
              onMouseEnter={e => e.target.style.opacity = '0.8'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              Add
            </button>
          </div>

          {/* Task List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {todos.length === 0 && (
              <div style={{
                textAlign: 'center',
                color: '#bbb',
                fontSize: '0.9rem',
                padding: '3rem 0',
                letterSpacing: '0.01em'
              }}>
                Nothing here yet — add your first task above.
              </div>
            )}
            {todos.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '10px',
                  padding: '0.875rem 1rem',
                  transition: 'border-color 0.15s',
                }}
              >
                <input
                  type="checkbox"
                  onChange={handleCheckbox}
                  checked={item.isCompleted}
                  name={item.id}
                  style={{
                    width: '17px',
                    height: '17px',
                    accentColor: '#111111',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                />
                <span style={{
                  flex: 1,
                  fontSize: '0.9375rem',
                  color: item.isCompleted ? '#bbb' : '#111111',
                  textDecoration: item.isCompleted ? 'line-through' : 'none',
                  wordBreak: 'break-word',
                  transition: 'color 0.2s',
                }}>
                  {item.todo}
                </span>
                <div style={{ display: 'flex', gap: '0.375rem', flexShrink: 0 }}>
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    style={{
                      background: 'none',
                      border: '1px solid #e5e5e5',
                      borderRadius: '6px',
                      padding: '0.3rem 0.65rem',
                      fontSize: '0.8rem',
                      color: '#666',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.target.style.borderColor = '#111'; e.target.style.color = '#111' }}
                    onMouseLeave={e => { e.target.style.borderColor = '#e5e5e5'; e.target.style.color = '#666' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    style={{
                      background: 'none',
                      border: '1px solid #e5e5e5',
                      borderRadius: '6px',
                      padding: '0.3rem 0.65rem',
                      fontSize: '0.8rem',
                      color: '#666',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.target.style.borderColor = '#e24b4a'; e.target.style.color = '#e24b4a' }}
                    onMouseLeave={e => { e.target.style.borderColor = '#e5e5e5'; e.target.style.color = '#666' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer count */}
          {todos.length > 0 && (
            <p style={{
              textAlign: 'center',
              color: '#ccc',
              fontSize: '0.8rem',
              marginTop: '2rem',
            }}>
              {todos.length - completedCount} remaining
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default App
