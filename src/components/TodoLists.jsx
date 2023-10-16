import React, { useState } from 'react'
import Todo from './Todo'
import TodoInput from './TodoInput'
import TodoCategories from './TodoCategories'


export default function TodoLists() {
  // -value of input field
  const [todo, setTodo] = useState({
    title: '',
    desc: ''
  })
  // -all todo-items array of objects
  const [todoLists, setTodoLists] = useState([])
  const [todoCategories, setTodoCategories] = useState([
    {
      category: 'work',
      id: 'clsm32',
    },
    {
      category: 'home',
      id: 'scfb23',
    },
    {
      category: 'hobby',
      id: 'sjiqn32',
    }
  ])
  const [showModal, setShowModule] = useState(false)

  let date = new Date()

  // - to create todo's
  const handleNotesSubmit = () => {
    if (todo.title.trim() !== '') {
      setTodoLists([{
        title: todo.title,
        desc: todo.desc,
        isChecked: false,
        id: crypto.randomUUID(),
        time: date.toLocaleTimeString()
      }, ...todoLists])
      setTodo({
        title: '',
        desc: ''
      })
    }
  }

  // - to create todo on 'Enter' key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNotesSubmit()
    }
  }

  // - to delete todo's
  const handleNotesDelete = (id) => {
    const filterTodos = todoLists.filter(item => item.id !== id)
    setTodoLists(filterTodos)
  }

  // - to handle checkmark
  const handleCheckmark = (id) => {
    const temp = todoLists.map(item => {
      if (item.id === id) {
        item.isChecked = !item.isChecked
        item.completedTime = date.toLocaleTimeString()
        return item
      }
      return item
    })
    setTodoLists(temp)
  }

  // - handle update modal toggle
  const handleModalToggle = (status) => {
    setShowModule((current) => status)
  }

  // - handle edit/update
  const handleEdit = (updatedTodoItem) => {
    const index = todoLists.findIndex(item => item.id === updatedTodoItem.id)
    const updatedTodoList = [...todoLists]
    // - replaces one item from the 'index' with the 'updatedTodoItem'
    updatedTodoList.splice(index, 1, updatedTodoItem)
    setTodoLists(updatedTodoList)
  }

  const handleCategorySelection = (name) => {
    console.log('category', name)
  }


  return (
    <>
      <div className='h-screen flex flex-col items-center gap-8'>
        <div className='text-3xl mt-20'>Todo App</div>

        {/* the input field and the add todo button */}
        <TodoInput
          todo={todo}
          setTodo={setTodo}
          handleNotesSubmit={handleNotesSubmit}
          handleKeyPress={handleKeyPress}
          showModal={showModal}
        >
          <TodoCategories todoCategories={todoCategories} handleCategorySelection={handleCategorySelection} />
        </TodoInput>

        {/* the individual todo items */}
        <div className='w-4/5 flex flex-col items-center'>
          <Todo
            todoLists={todoLists}
            handleCheckmark={handleCheckmark}
            handleNotesDelete={handleNotesDelete}
            handleModalToggle={handleModalToggle}
            showModal={showModal}
            handleEdit={handleEdit}
          />
        </div>
      </div>
    </>
  )
} 