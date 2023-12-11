import React from 'react'

export default function TodoInput({ children, todo, setTodo, handleCreateTodo, handleKeyPress, showModal }) {
    return (
        <div className='flex flex-col sm:flex-row gap-2'>
            {children}
            <input
                type="text"
                placeholder='Title'
                className='border-2 px-2 py-1'
                value={todo.title}
                onChange={(e) => setTodo((prev) => ({ ...prev, title: e.target.value }))}
                onKeyUp={handleKeyPress}
                disabled={showModal}
            />
            <input
                type="text"
                placeholder='Desc'
                className='border-2 px-2 py-1'
                value={todo.desc}
                onChange={(e) => setTodo((prev) => ({ ...prev, desc: e.target.value }))}
                onKeyUp={handleKeyPress}
                disabled={showModal}
            />
            <button className='p-1 sm:px-4 rounded text-white bg-indigo-600' onClick={handleCreateTodo}>
                Add
            </button>
        </div>
    )
}
