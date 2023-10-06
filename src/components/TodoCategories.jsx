import React from 'react'

export default function TodoCategories({ todoCategories, handleCategorySelection }) {

    return (
        <select 
            name="category" 
            id="category" 
            className='border-2' 
            onChange={(e) => handleCategorySelection(e.target.value)}
        >
            <option value="">Select category</option>
            {todoCategories.map(item => {
                return (
                    <option
                        value={`${item.category}`}
                        key={item.id}
                    >
                        {item.category}
                    </option>
                )
            })}
        </select>
    )
}
