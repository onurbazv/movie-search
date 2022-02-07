import { useState } from 'react'
import ReactDOM from 'react-dom'


export const useModal = (Component) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    const ModalComponent = ({closeModal}) => {

        return (
            isOpen ? ReactDOM.createPortal(
                <>
                    <div className="fixed inset-0 grid place-items-center z-10">
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10" onClick={closeModal}></div>
                        <div className="bg-white rounded p-8 max-w-screen-sm modal z-20 overflow-y-auto">
                            <Component closeModal={closeModal}/>
                        </div>
                    </div>
                </>, document.getElementById("portal")
            ) : null
        )
    }

    return [ModalComponent, {open, close}]
}