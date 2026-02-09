import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { isValidToken } from '../helpers/isValidToken'
import axios from 'axios'

export const AuthContext = createContext({})

const NOVI_API = 'https://novi-backend-api-wgsgz.ondigitalocean.app/api'
const NOVI_PROJECT_ID = '667e832d-8201-4580-afa3-87aecee36a78'

const noviApi = axios.create({
    baseURL: NOVI_API,
    headers: {
        'Content-Type': 'application/json',
        'novi-education-project-id': NOVI_PROJECT_ID
    }
})

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending'
    })

    // check token bij laden
    useEffect(() => {
        const storedToken = localStorage.getItem('token')

        if (storedToken && isValidToken(storedToken)) {
            loginWithToken(storedToken)
        } else {
            logout()
        }
    }, [])

    async function loginWithToken(jwtToken) {
        localStorage.setItem('token', jwtToken)

        try {
            const decodedToken = jwtDecode(jwtToken)
            const userId = decodedToken.userId
            const email = decodedToken.email
            const username = decodedToken.username || email

            setAuth({
                isAuth: true,
                user: { username, email, id: userId },
                status: 'done'
            })
        } catch (err) {
            console.log('token decode mislukt', err)
            logout()
        }
    }

    function logout() {
        localStorage.removeItem('token')
        setAuth({
            isAuth: false,
            user: null,
            status: 'done'
        })
    }

    async function register(username, email, password) {
        try {
            await noviApi.post('/users', {
                email,
                password,
                username,
                roles: ['user']
            })

            return await authenticate(email, password)
        } catch (err) {
            console.log('register error:', err)
            return {
                success: false,
                error: err.response?.data?.message || 'Registratie mislukt'
            }
        }
    }

    async function authenticate(email, password) {
        try {
            const response = await noviApi.post('/login', {
                email,
                password
            })

            if (response.data.token) {
                await loginWithToken(response.data.token)
                return { success: true }
            }

            return { success: false, error: 'Geen token ontvangen' }
        } catch (err) {
            console.log('login error:', err)
            return {
                success: false,
                error: err.response?.data?.message || 'Inloggen mislukt'
            }
        }
    }

    // wacht tot auth klaar is
    if (auth.status !== 'done') {
        return null
    }

    return (
        <AuthContext.Provider value={{
            isAuth: auth.isAuth,
            user: auth.user,
            logout,
            register,
            authenticate
        }}>
            {children}
        </AuthContext.Provider>
    )
}
