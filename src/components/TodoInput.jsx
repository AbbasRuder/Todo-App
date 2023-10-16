import React from 'react'

export default function TodoInput({ children, todo, setTodo, handleCreateTodo, handleKeyPress, showModal }) {
    return (
        <div className='flex flex-col sm:flex-row gap-2'>
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
            {children}
            <button className='bg-slate-300 px-2 rounded' onClick={handleCreateTodo}>➕</button>
        </div>
    )
}
