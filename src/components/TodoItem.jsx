import { useState } from "react"
import { FaCheckSquare, FaSquare } from "react-icons/fa";
import { FaSquareXmark } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";


// Responsible for rendering of individual todo items and event-handlers for checkmark and delete-todo's
export default function Todo({ todoLists, handleCheckmark, handleDelete, handleModalToggle, showModal, handleEdit }) {
    // -to toggle between todo and complete tabs
    const [showTodo, setShowTodo] = useState(true)
    // - the todo item that is being updated
    const [todoToUpdate, setTodoToUpdate] = useState(null)

    const handleShowTodo = (status) => {
        setShowTodo(prev => status)
    }

    // -handle update modal and input form
    const handleUpdateModal = (status, id) => {
        handleModalToggle(status)
        const filterTodoToEdit = todoLists.filter(item => item.id === id)
        setTodoToUpdate(filterTodoToEdit[0])
    }

    //- handle submission of the updated todo item
    const handleSubmitUpdatedTodo = () => {
        handleEdit(todoToUpdate)
        handleModalToggle(false)
    }

    // - tracks the no of completed tasks
    const completedTodos = todoLists.filter(item => item.isChecked === true)

    // - individual todo items
    const renderTodoItem = (item) => {
        return (
            <div className='w-full flex items-center justify-center gap-1 sm:gap-2 px-2' key={item.id}>
                <button className=''
                    onClick={() => handleCheckmark(item.id)}
                    disabled={showModal}
                >
                    {item.isChecked ? <FaCheckSquare size={38} color="#adc9f0"/> : <FaSquare size={38} color="#adc9f0"/>}
                </button>
                <div className="w-4/5 min-w-[190px] md:w-[600px] border-2 py-1">
                    <div className={`relative px-2 ${item.isChecked && 'line-through'}`}>
                        <p className="pt-2 text-lg font-semibold dark:text-white">{item.title}</p>
                        <span className="absolute top-0 right-0 mr-1 text-xs text-slate-300">
                            {item.time} {item.isChecked && item.completedTime && `- ${item.completedTime}`}
                        </span>
                    </div>
                    <p className='px-2 leading-tight dark:text-white dark:opacity-70'>
                        {item.desc}
                    </p>
                </div>
                <button 
                    onClick={() => handleDelete(item.id)}
                    disabled={showModal}
                >
                    <FaSquareXmark size={38} color="#fca5a5"/>
                </button>
                {!item.isChecked && 
                <button className='bg-blue-200 p-2 rounded'
                    onClick={() => handleUpdateModal(true, item.id)}
                    disabled={showModal}
                >
                    <FaRegEdit size={19} color=""/>
                </button>}
            </div>
        )
    }

    return (
        <>
            {/* Todo and Completed tabs */}
            <div className="w-fit mb-4 flex bg-slate-200">
                <button className={`relative bg-gray-100 ${showTodo && 'bg-slate-200 drop-shadow-lg'}`} onClick={() => handleShowTodo(true)}>
                    <p className="mx-5 my-2"> Todo's</p>
                    <span className="absolute top-0 right-0 w-5 bg-blue-200 rounded-full drop-shadow-md text-sm">
                        {todoLists.length - completedTodos.length}
                    </span>
                </button>
                <button className={`relative bg-gray-100 ${!showTodo && 'bg-slate-200 drop-shadow-md'}`} onClick={() => handleShowTodo(false)}>
                    <p className="mx-5 my-2">Completed</p>
                    <span className="absolute top-0 right-0 w-5 bg-blue-200 rounded-full drop-shadow-md text-sm">
                        {completedTodos.length}
                    </span>
                </button>
            </div>

            {/* todo items */}
            <div className={`w-full flex flex-col gap-3 ${showModal && "opacity-30"}`}>
                {todoLists.length > 0 ? (
                    showTodo ? (
                        // - todo tasks
                        completedTodos.length === todoLists.length
                            ? <p className="text-center dark:text-slate-300">Wow! all done</p>
                            : todoLists.map((item) => !item.isChecked && renderTodoItem(item))
                    ) : (
                        // - completed tasks
                        completedTodos.length > 0
                            ? todoLists.map((item) => item.isChecked && renderTodoItem(item))
                            : <p className="text-center dark:text-slate-300">Feeling Lazy?</p>
                    )
                ) : (
                    <p className="text-center dark:text-slate-300">No task created yet</p>
                )
                }
            </div>

            {/* Modal */}
            {showModal && (
                <div className="flex flex-col gap-2 absolute bg-slate-200 drop-shadow-md p-10 dark:bg-gray-600">
                    <button className="absolute top-0 right-0 p-1 mr-1 mt-1 rounded"
                        onClick={() => handleUpdateModal(false)}>
                        <FaRegWindowClose size={25} color="red" className="rounded"/>
                    </button>
                    <label htmlFor="title" className="dark:text-white">Title:</label>
                    <input 
                        type="text" 
                        id="title" 
                        value={todoToUpdate.title}
                        onChange={(e) => setTodoToUpdate({ ...todoToUpdate, title: e.target.value })} 
                        className="border-2 p-1 rounded"
                    />

                    <label htmlFor="desc" className="dark:text-white">Desc:</label>
                    <input 
                        type="text" 
                        id="desc" 
                        value={todoToUpdate.desc}
                        onChange={(e) => setTodoToUpdate({ ...todoToUpdate, desc: e.target.value })} 
                        className="border-2 p-1 rounded"
                    />

                    <button className="bg-cyan-300 py-1 px-2 rounded text-white" onClick={handleSubmitUpdatedTodo}>Update</button>
                </div>
            )}
        </>
    )
}
