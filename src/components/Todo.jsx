import { useEffect, useState } from "react"

// Responsible for rendering of individual todo items and event-handlers for checkmark and delete-todo's
export default function Todo({ todoLists, handleCheckmark, handleNotesDelete }) {
    // -to toggle between todo and complete tabs
    const [showTodo, setShowTodo] = useState(true)

    const handleShowTodo = (status) => {
        setShowTodo(prev => status)
    }


    const renderTodoItem = (item) => {
        return (
            <div className='w-full flex items-center justify-center gap-2 px-2' key={item.id}>
                <button className='bg-blue-100 w-9 h-9 rounded'
                    onClick={() => handleCheckmark(item.id)} >
                    {item.isChecked && <span>✔️</span>}
                </button>
                <div className="w-4/5 md:w-[600px] border-2 py-1">
                    <p className={`px-2 text-lg font-semibold ${item.isChecked && 'line-through'}`}>
                        {item.title}
                    </p>
                    <p className={` px-2 leading-tight`}>
                        {item.desc}
                    </p>
                </div>
                <button className='bg-red-200 h-9 px-2 rounded'
                    onClick={() => handleNotesDelete(item.id)} >
                    ✖️
                </button>
            </div>
        )
    }

    // - tracks the no of completed tasks
    const completedTodos = todoLists.filter(item => item.isChecked === true)

    return (
        <>
            <div className="w-fit mb-4 flex bg-slate-200">
                <button className={`relative bg-gray-100 ${showTodo && 'bg-slate-200 drop-shadow-lg'}`} onClick={(e) => { handleShowTodo(true) }}>
                    <p className="mx-5 my-2"> Todo's</p>
                    <span className="absolute top-0 right-0 w-5 bg-blue-200 rounded-full drop-shadow-md text-sm">
                        {todoLists.length - completedTodos.length}
                    </span>
                </button>
                <button className={`relative bg-gray-100 ${!showTodo && 'bg-slate-200 drop-shadow-md'}`} onClick={(e) => { handleShowTodo(false)}}>
                    <p className="mx-5 my-2">Completed</p>
                    <span className="absolute top-0 right-0 w-5 bg-blue-200 rounded-full drop-shadow-md text-sm">
                        {completedTodos.length}
                    </span>
                </button>
            </div>

            <div className="w-full flex flex-col gap-3">
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
                            : <p className="text-center">Master Procrastinator ?</p>
                    )
                ) : (
                    <p className="text-center">No task created yet</p>
                )
                }
            </div>
        </>
    )
}
