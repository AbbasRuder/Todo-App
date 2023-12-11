import React, { useState } from 'react'

export default function TodoCategories({ todoCategories, setSelectedCategory, handleCategorySelection }) {


    return (
        <select
            name="category"
            id="category"
            className='border-2'
            onChange={(e) => setSelectedCategory(e.target.value)}
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
