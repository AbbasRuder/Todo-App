import React from 'react'

export default function TodoInput({ children, todo, setTodo, handleNotesSubmit, handleKeyPress }) {
    return (
        <div className='flex flex-col sm:flex-row gap-2'>
            <input
                type="text"
                placeholder='Title'
                className='border-2 px-2 py-1'
                value={todo.title}
                onChange={(e) => setTodo((prev) => ({...prev, title: e.target.value}))}
                onKeyUp={handleKeyPress}
            />
            <input
                type="text"
                placeholder='Desc'
                className='border-2 px-2 py-1'
                value={todo.desc}
                onChange={(e) => setTodo((prev) => ({...prev, desc: e.target.value}))}
                onKeyUp={handleKeyPress}
            />
            {children}
            <button className='bg-slate-300 px-2 rounded' onClick={handleNotesSubmit}>➕</button>
        </div>
    )
}
