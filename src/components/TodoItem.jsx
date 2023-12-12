import { useEffect, useState } from "react"
import { FaCheckSquare, FaSquare } from "react-icons/fa";
import { FaSquareXmark } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import Modal from "./Modal";

// Responsible for rendering of individual todo items and event-handlers for checkmark, delete and update todo's
export default function Todo({
    todoLists,
    handleCheckmark,
    handleDelete,
    handleModalToggle,
    showModal,
    handleEdit,
    todoCategories,
    setTodoCategories
}) {
    // -to toggle between todo and complete tabs
    const [showTodo, setShowTodo] = useState(true)
    // - the todo item that is being updated
    const [todoToUpdate, setTodoToUpdate] = useState(null)
    // -the selected category to display todo's
    const [selectedCategory, setSelectedCategory] = useState('All')
    // -new category input value
    const [newCategory, setNewCategory] = useState('')
    // -visibility of create new categories modal
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    // -filtered Todo's based on categories
    const [filteredTodos, setFilteredTodos] = useState([])

    const handleShowTodo = (status) => {
        setShowTodo(current => status)
    }

    // -handle update modal and input form
    const handleUpdateModal = (id) => {
        handleModalToggle()
        if (id) {
            const filterTodoToEdit = todoLists.filter(item => item.id === id)
            setTodoToUpdate(filterTodoToEdit[0])
        }
    }

    //- handle submission of the updated todo item
    const handleSubmitUpdatedTodo = () => {
        handleEdit(todoToUpdate)
        handleModalToggle()
    }

    const handleCategoriesModal = () => {
        setShowCategoryModal(current => !current)
    }

    // -handle creating new categories
    const handleCreateNewCategories = () => {
        if (newCategory.trim() !== '') {
            setTodoCategories([...todoCategories, {
                category: newCategory[0].toUpperCase() + newCategory.slice(1),
                id: crypto.randomUUID()
            }])
            handleCategoriesModal()
            setNewCategory('')
        }
    }

    // - tracks the no of completed tasks
    const completedTodos = filteredTodos && filteredTodos.filter(item => item.isChecked === true)

    // - render individual todo items
    const renderTodoItem = (item) => {
        return (
            <div className='w-full flex items-center justify-center gap-1 sm:gap-2 px-2' key={item.id}>
                <button className=''
                    onClick={() => handleCheckmark(item.id)}
                    disabled={showModal}
                >
                    {item.isChecked ? <FaCheckSquare size={38} color="#adc9f0" /> : <FaSquare size={38} color="#adc9f0" />}
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
                    <FaSquareXmark size={38} color="#fca5a5" />
                </button>
                {!item.isChecked &&
                    <button className='bg-blue-200 p-2 rounded'
                        onClick={() => handleUpdateModal(item.id)}
                        disabled={showModal}
                    >
                        <FaRegEdit size={19} color="" />
                    </button>}
            </div>
        )
    }

    useEffect(() => {
        if (todoLists) {
            let filtered = []
            if (selectedCategory === 'All') {
                filtered = todoLists.map(item => item)
            } else {
                const category = todoCategories.filter(item => item.category === selectedCategory)
                filtered = todoLists.filter(item => item.category_id === category[0].id)
            }

            setFilteredTodos(filtered)
        }
    }, [selectedCategory, todoLists])

    return (
        <>

            <div className="flex flex-col">
                {/* Todo and Completed tabs */}
                <div className="flex gap-2 ">
                    <button className={`relative bg-indigo-600 ${showTodo && 'text-white font-semibold drop-shadow-lg'}`} onClick={() => handleShowTodo(true)}>
                        <p className="text-sm sm:text-md mx-2 my-1 sm:mx-5 sm:my-2"> Todo's</p>
                        <span className="absolute -top-2 -right-2 w-5 rounded-full drop-shadow-md text-sm bg-blue-200">
                            {filteredTodos.length - completedTodos.length}
                        </span>
                    </button>
                    <button className={`relative bg-indigo-600 ${!showTodo && 'text-white font-semibold drop-shadow-lg'}`} onClick={() => handleShowTodo(false)}>
                        <p className="mx-2 my-1 sm:mx-5 sm:my-2">Completed</p>
                        <span className="absolute -top-2 -right-2 w-5 bg-blue-200 rounded-full drop-shadow-md text-sm">
                            {completedTodos.length}
                        </span>
                    </button>
                </div>
                {/* Category selection */}
                <div className="mt-1 flex items-center">
                    <select
                        name="category"
                        id="category"
                        className='w-10/12 border-2 outline-none'
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All">All</option>
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
                    <MdAddBox size={30} className="w-2/12 cursor-pointer dark:text-white" onClick={handleCategoriesModal} />
                </div>
            </div>

            {/* Modal for creating new category */}
            {showCategoryModal && (
                <Modal modalCloseFunction={handleCategoriesModal}>
                    <h1 className="text-lg font-bold">Create new category</h1>
                    <label htmlFor="name" className="dark:text-white">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="border-2 p-1 rounded"
                    />
                    <button className="bg-cyan-300 py-1 px-2 rounded text-white" onClick={handleCreateNewCategories}>Create</button>
                </Modal>
            )}

            {/* todo items */}
            {/*//- show the todo's when categories modal is not open (to avoid clicking on things when modal is open) */}
            {!showCategoryModal &&
                <div className={`w-full mt-4 mb-4 flex flex-col gap-3 ${showModal && "opacity-30"}`}>
                    {filteredTodos.length > 0 ? (
                        showTodo ? (
                            // - todo tasks
                            completedTodos.length === filteredTodos.length
                                ? <p className="text-center dark:text-slate-300">Wow! all done</p>
                                : filteredTodos.map((item) => !item.isChecked && renderTodoItem(item))
                        ) : (
                            // - completed tasks
                            completedTodos.length > 0
                                ? filteredTodos.map((item) => item.isChecked && renderTodoItem(item))
                                : <p className="text-center dark:text-slate-300">Feeling Lazy?</p>
                        )
                    ) : (
                        <p className="text-center dark:text-slate-300">No task created yet</p>
                    )
                    }
                </div>}

            {/* Update Modal */}
            {showModal && (
                <Modal modalCloseFunction={handleUpdateModal}>
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
                </Modal>
            )}
        </>
    )
}
