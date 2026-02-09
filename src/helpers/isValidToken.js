import { jwtDecode } from 'jwt-decode'

// check of JWT token nog geldig is (niet expired)
export function isValidToken(token) {
    try {
        const decodedToken = jwtDecode(token)
        const expirationTime = decodedToken.exp * 1000
        const isExpired = Date.now() > expirationTime
        return !isExpired
    } catch (e) {
        console.log('ongeldige token', e)
        return false
    }
}
