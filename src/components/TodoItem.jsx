import { useState } from "react"

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
            <div className='w-full flex items-center justify-center gap-2 px-2' key={item.id}>
                <button className='bg-blue-100 w-9 h-9 rounded'
                    onClick={() => handleCheckmark(item.id)}
                    disabled={showModal}
                >
                    {item.isChecked && <span>✔️</span>}
                </button>
                <div className="w-4/5 md:w-[600px] border-2 py-1">
                    <div className={`relative px-2 ${item.isChecked && 'line-through'}`}>
                        <p className="pt-2 text-lg font-semibold">{item.title}</p>
                        <span className="absolute top-0 right-0 mr-1 text-xs text-slate-300">
                            {item.time} {item.isChecked && item.completedTime && `-${item.completedTime}`}
                        </span>
                    </div>
                    <p className={` px-2 leading-tight`}>
                        {item.desc}
                    </p>
                </div>
                <button className='bg-red-200 h-9 px-2 rounded'
                    onClick={() => handleDelete(item.id)}
                    disabled={showModal}
                >
                    ✖️
                </button>
                {!item.isChecked && <button className='bg-blue-100 h-9 px-2 rounded'
                    onClick={() => handleUpdateModal(true, item.id)}
                    disabled={showModal}
                >
                    📝
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
                            ? <p className="text-center">Wow! all done</p>
                            : todoLists.map((item) => !item.isChecked && renderTodoItem(item))
                    ) : (
                        // - completed tasks
                        completedTodos.length > 0
                            ? todoLists.map((item) => item.isChecked && renderTodoItem(item))
                            : <p className="text-center">Feeling Lazy?</p>
                    )
                ) : (
                    <p className="text-center">No task created yet</p>
                )
                }
            </div>

            {/* Modal */}
            {showModal && (
                <div className="flex flex-col gap-2 absolute bg-slate-200 drop-shadow-md p-10">
                    <button className="absolute top-0 right-0 p-1 mr-1 mt-1 rounded bg-slate-100"
                        onClick={() => handleUpdateModal(false)}>
                        ❌
                    </button>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" className="border-2 p-1 rounded"
                        value={todoToUpdate.title}
                        onChange={(e) => setTodoToUpdate({ ...todoToUpdate, title: e.target.value })} />

                    <label htmlFor="desc">Desc:</label>
                    <input type="text" id="desc" className="border-2 p-1 rounded"
                        value={todoToUpdate.desc}
                        onChange={(e) => setTodoToUpdate({ ...todoToUpdate, desc: e.target.value })} />

                    <button className="bg-cyan-300 py-1 px-2 rounded text-white" onClick={handleSubmitUpdatedTodo}>Update</button>
                </div>
            )}
        </>
    )
}
