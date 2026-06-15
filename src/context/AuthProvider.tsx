import React, { createContext, useContext, useState } from 'react'
import { loginAPI, registerAPI, logoutAPI } from '../service'
import { User } from '../types'

interface AuthCtx {
    user: User | null
    login: (e: string, p: string) => Promise<User | null>
    signup: (n: string, e: string, ph: string, p: string) => Promise<boolean>
    logout: () => Promise<void>
    updateUser: (d: Partial<User>) => void
}

const Ctx = createContext<AuthCtx | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        // ✅ Rehydrate user from sessionStorage on first load
        const stored = sessionStorage.getItem('user')
        return stored ? JSON.parse(stored) : null
    })

    // LOGIN API
    const login = async (email: string, password: string): Promise<User | null> => {
        try {
            const reqData = {
                email,
                password,
            }

            const response = await loginAPI(reqData)

            if (response?.data) {
                const userData = response.data?.user || response.data; // Adjust based on actual response structure
                const token = response.data.accessToken || response.data.token; // Adjust based on actual response structure
                setUser({
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                    role: userData.role
                })
                console.log("userData====>", userData);
                console.log("token====>", token);
                // Optional: store token
                if (token) {
                    sessionStorage.setItem('token', token)
                    sessionStorage.setItem('user', JSON.stringify(userData))
                }

                return userData;
            }

            return null
        } catch (error) {
            console.log('Login Failed:', error)
            return null
        }
    }

    // REGISTER API
    const signup = async (
        name: string,
        email: string,
        phone: string,
        password: string
    ): Promise<boolean> => {
        try {
            const reqData = {
                name,
                email,
                phone,
                password,
                role: 'CUSTOMER'
            }

            const response = await registerAPI(reqData)

            if (response?.data) {
                const userData = response.data?.user || response.data; // Adjust based on actual response structure
                const token = response.data.accessToken || response.data.token; // Adjust based on actual response structure

                setUser({
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                    role: userData.role
                })

                // Optional: store token
                if (userData.token) {
                    sessionStorage.setItem('token', userData.token)
                    sessionStorage.setItem('user', JSON.stringify(userData))
                }

                return true
            }

            return false
        } catch (error) {
            console.log('Signup Failed:', error)
            return false
        }
    }

    // LOGOUT API
    const logout = async () => {
        try {
            await logoutAPI()

            sessionStorage.removeItem('token')
            setUser(null)
        } catch (error) {
            console.log('Logout Failed:', error)
        }
    }

    const updateUser = (d: Partial<User>) =>
        setUser(prev => (prev ? { ...prev, ...d } : null))

    return (
        <Ctx.Provider
            value={{
                user,
                login,
                signup,
                logout,
                updateUser,
            }}
        >
            {children}
        </Ctx.Provider>
    )
}

export const useAuth = () => {
    const c = useContext(Ctx)

    if (!c) {
        throw new Error('no auth')
    }

    return c
}