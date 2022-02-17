import { useEffect } from 'react'
import ReactDOM from 'react-dom'

const Modal = ({isOpen, close, child}) => {  
    useEffect(() =>{
        if (isOpen) {
            document.body.style.overflow = "hidden"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        isOpen ? ReactDOM.createPortal(
            <>
                <div className="fixed inset-0 grid place-items-center z-10">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10" onClick={close}></div>
                    <div className="bg-white rounded p-8 my-16 max-w-screen-lg modal z-20 overflow-auto">
                        {child}
                    </div>
                </div>
            </>, document.getElementById("portal")
        ) : null
    )
}

export default Modal