import { useState } from 'react'
// import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleDelete = (e, id) => {

    let newTodos = todos.filter(element => {
      return element.id !== id

    });
    setTodos(newTodos)

  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(element => {
      return element.id !== id

    });
    setTodos(newTodos)
  }

  const handleAdd = () => {
    if (todo === "" || todo === undefined) {
      alert("You have not added anything in the given space.")
      return addTaskSpace.focus();
    }
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("");
    console.log(todos);
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let ID = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === ID;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    

  }

  return (
    <>
      <Navbar />
      <div className="cont my-2 flex justify-center ">
        <div className="bg-green-300 rounded-3xl p-5 w-2/4 flex flex-col  gap-2 shadow-2xl ">
          <h1 className='font-bold text-5xl my-2 '>Your List for Everyday Tasks</h1>

          <div className="contentCont bg-slate-300 w-full rounded-3xl flex flex-col  p-4">
            <h2 className='font-semibold text-lg'>Add a Task</h2>
            <div className='flex flex-row w-full '>
              <input onChange={handleChange} value={todo} type="text" className='bg-white rounded w-full p-1 ' id='addTaskSpace' />
              <button onClick={handleAdd} className='transition-all duration-[0.01s] hover:scale-110 border border-white px-2 rounded mx-3 '>Add</button>
            </div>
          </div>

          <h2 className='font-semibold text-xl'>Your Tasks:</h2>

          <div className="todos">

            {todos.length === 0 && <div> Add tasks to display here. </div>}
            {todos.map(item => {

              return <div key={item.id} className="todo flex justify-between my-4 ">
                <input type="checkbox" onChange={handleCheckbox} value={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""} >{item.todo}</div>
                <div className="buttons">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='transition-all duration-[0.01s] hover:scale-110 border border-white px-2 rounded mx-1'>Edit</button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='transition-all duration-[0.01s] hover:scale-110 border border-white px-2 rounded mx-1'>Delete</button>
                </div>
              </div>
            }
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default App
