import { createContext, useContext, useEffect, useState } from "react";
import api from '../api/api'

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const fetchUser  = async () => {
        try {
            const res = await api.get("/user/me")
            setUser(res.data)
        } catch (err) {
            setUser(null)
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            await api.post("/user/logout")
        } catch (err) {
            console.error(err.message)
        } finally {
            setUser(null)
        }
    }

    const login = async (email, password) => {
        await api.post("/user/login", { email, password });
        await fetchUser();
    };

    const register = async (name, email, password) => {
        await api.post("/user/register", { name, email, password });
    };


    useEffect(()=>{
        fetchUser()
    },[])

    return (
        <AuthContext.Provider value={{user, isAuthenticated: !!user, loading, login, register, logout, refetchUser:fetchUser}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)