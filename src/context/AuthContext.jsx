import { createContext, useState, useEffect } from 'react'
import testUsers from '../helpers/testUsers'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const saved = localStorage.getItem('user')
        if (saved) {
            setUser(JSON.parse(saved))
            setIsAuth(true)
        }
    }, [])

    function login(email, password) {
        const found = testUsers.find(
            u => u.email === email && u.password === password
        )

        if (!found) {
            return { success: false, error: "Email of wachtwoord klopt niet" }
        }

        const userData = { id: found.id, username: found.username, email: found.email }
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        setIsAuth(true)
        return { success: true }
    }

    function register(username, email, password) {
        const exists = testUsers.find(u => u.email === email)
        if (exists) {
            return { success: false, error: "Dit emailadres is al in gebruik" }
        }

        const user = {
            id: testUsers.length + 1,
            username,
            email,
            password
        }
        testUsers.push(user)

        const userData = { id: user.id, username, email }
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        setIsAuth(true)
        return { success: true }
    }

    function logout() {
        localStorage.removeItem('user')
        setUser(null)
        setIsAuth(false)
    }

    return (
        <AuthContext.Provider value={{ isAuth, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
