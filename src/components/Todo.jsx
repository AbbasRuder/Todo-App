import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import TodoInput from './TodoInput'
import TodoCategories from './TodoCategories'
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";


export default function TodoLists() {
  // -value of input field
  const [todo, setTodo] = useState({
    title: '',
    desc: ''
  })
  // -all todo-items array of objects
  const [todoLists, setTodoLists] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Home')
  const [todoCategories, setTodoCategories] = useState([
    {
      category: 'Home',
      id: '93fd5c20-6806-454d-ae54-d993a93ea597',
    }
  ])
  const [showModal, setShowModal] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  let date = new Date()

  // - to create todo's
  const handleCreateTodo = () => {
    const category = todoCategories.filter(item => item.category === selectedCategory)
    if (todo.title.trim() !== '') {
      setTodoLists((currentTodos) => {
        return [
          {
            title: todo.title,
            desc: todo.desc,
            isChecked: false,
            id: crypto.randomUUID(),
            category_id: category[0].id,
            time: date.toLocaleTimeString()
          },
          ...currentTodos]
      })

      setTodo({
        title: '',
        desc: ''
      })
    }
  }

  // - to create todo on 'Enter' key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateTodo()
    }
  }

  // - to delete todo's
  const handleDelete = (id) => {
    setTodoLists((currentTodos) => {
      const nextTodos = currentTodos.filter(item => item.id !== id)
      return nextTodos
    })
  }


  // - to handle checkmark
  const handleCheckmark = (id) => {
    const updatedTodos = todoLists.map(item => {
      if (item.id === id) {
        item.isChecked = !item.isChecked
        item.completedTime = date.toLocaleTimeString()
        return item
      }
      return item
    })
    setTodoLists(updatedTodos)
  }

  // - handle update modal toggle
  const handleModalToggle = () => {
    setShowModal((current) => !current)
  }

  // - handle edit/update
  const handleEdit = (updatedTodoItem) => {
    const index = todoLists.findIndex(item => item.id === updatedTodoItem.id)
    const updatedTodoList = [...todoLists]
    // - replaces one item from the 'index' with the 'updatedTodoItem'
    updatedTodoList.splice(index, 1, updatedTodoItem)
    setTodoLists(updatedTodoList)
  }

  const handleDarkModeToggle = () => {
    setDarkMode(current => !current)
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <>
      <button className='absolute right-0 mr-2 sm:mr-10 mt-5 bg-slate-300 px-2 py-1 rounded' onClick={handleDarkModeToggle}>
        {darkMode ? <MdOutlineLightMode className='sm:w-6 sm:h-7' /> : <MdOutlineDarkMode className='sm:w-6 sm:h-7' />}
      </button>
      <div className='pt-6 flex flex-col items-center gap-8'>
        <div className='p-2 text-3xl font-bold border-2 border-cyan-100 rounded outline outline-1 outline-offset-2 outline-cyan-500 dark:text-white'>
          Todo App
        </div>
        {/* the input field and the add todo button */}
        <TodoInput
          todo={todo}
          setTodo={setTodo}
          handleCreateTodo={handleCreateTodo}
          handleKeyPress={handleKeyPress}
          showModal={showModal}
        >
          <TodoCategories todoCategories={todoCategories} setSelectedCategory={setSelectedCategory} />
        </TodoInput>

        {/* the individual todo items */}
        <div className='w-4/5 flex flex-col items-center'>
          <TodoItem
            todoLists={todoLists}
            handleCheckmark={handleCheckmark}
            handleDelete={handleDelete}
            handleModalToggle={handleModalToggle}
            showModal={showModal}
            handleEdit={handleEdit}
            todoCategories={todoCategories}
            setTodoCategories={setTodoCategories}
          />
        </div>
      </div>
    </>
  )
} 