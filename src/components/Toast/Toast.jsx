import { useContext } from 'react'
import { ToastContext } from '../../context/ToastContext'
import './Toast.scss'

const Toast = () => {
    const { toast, hideToast } = useContext(ToastContext)

    if (!toast) return null

    return (
        <div className={`toast toast-${toast.type}`} onClick={hideToast}>
            <p className="toast-message">{toast.message}</p>
        </div>
    )
}

export default Toast
