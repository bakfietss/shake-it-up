import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

function ProtectedRoute({ children }) {
    const { isAuth } = useContext(AuthContext)
    const { showToast } = useToast()

    if (!isAuth) {
        showToast("Je moet eerst inloggen om je favorieten te bekijken", "info")
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute
