import { createContext, useState, useCallback, useContext } from 'react'

export const ToastContext = createContext(null)

// shortcut voor useContext
export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast moet binnen ToastProvider gebruikt worden')
    }
    return context
}

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null)
    const [timeoutId, setTimeoutId] = useState(null)

    const showToast = useCallback((message, type = 'info', duration = 5000) => {
        if (timeoutId) clearTimeout(timeoutId)

        setToast({ message, type })

        const newTimeoutId = setTimeout(() => {
            setToast(null)
        }, duration)

        setTimeoutId(newTimeoutId)
    }, [timeoutId])

    const hideToast = useCallback(() => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        setToast(null)
    }, [timeoutId])

    const contextData = {
        toast,
        showToast,
        hideToast
    }

    return (
        <ToastContext.Provider value={contextData}>
            {children}
        </ToastContext.Provider>
    )
}
