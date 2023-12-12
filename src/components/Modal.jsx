import React from 'react'
import { FaRegWindowClose } from "react-icons/fa";


export default function Modal({
    modalCloseFunction,
    children
}) {
    return (
        <div className="absolute flex flex-col gap-2 bg-slate-200 drop-shadow-md p-10 dark:bg-gray-600">
            <button className="absolute top-0 right-0 p-1 mr-1 mt-1 rounded"
                onClick={modalCloseFunction}>
                <FaRegWindowClose size={25} color="red" className="rounded" />
            </button>
            {children}
        </div>
    )
}
