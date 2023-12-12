
export default function TodoCategories({ todoCategories, setSelectedCategory }) {


    return (
        <select
            name="category"
            id="category"
            className='border-2'
            onChange={(e) => setSelectedCategory(e.target.value)}
        >
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
