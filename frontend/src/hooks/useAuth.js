import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext.jsx"

import {signup,login,logout,getCurrentUser} from "../services/auth.api.js"

export const useAuth = () => {
    const { user, loading, error, isAuthenticated, setLoading, setError, setIsAuthenticated, setUser } = useContext(AuthContext)


    const handleRegister = async (username, email, password) => {
        setLoading(true)
        try {
            const res = await signup( username, email, password )
            setUser(res.user)
            setIsAuthenticated(true)
            return res
        } catch (err) {
              setError(err.response?.data?.error || err.response?.data?.message || err.message)
            console.log("error in signup : ", err)
            throw err
        }
        finally{
            setLoading(false)
        }
    }

    const handleLogin = async (email, password) => {
        setLoading(true)
        try {
            const res = await login( email, password )
            setUser(res.user)
            setIsAuthenticated(true)
            return res
        } catch (err) {
              setError(err.response?.data?.error || err.response?.data?.message || err.message)

            console.log("error in login : ", err)
            throw err
        }
         finally{
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const res = await logout()
            setUser(null)
            setIsAuthenticated(false)
            return res
        } catch (err) {
              setError(err.response?.data?.error || err.response?.data?.message || err.message)

            console.log("error in logout : ", err)
            throw err
        }
         finally{
            setLoading(false)
        }
    }

    const handleGetCurrentUser = async () => {
        setLoading(true)
        try {
            const res = await getCurrentUser()
            setUser(res)
            setIsAuthenticated(true)
            return res
        } catch (err) {
              setError(err.response?.data?.error || err.response?.data?.message || err.message)

            console.log("error in getting user : ",err)
            throw err
        }
         finally{
            setLoading(false)
        }
    }


    return {
        user,
        loading,
        error,
        isAuthenticated,
        handleRegister,
        handleLogin,
        handleLogout,
        handleGetCurrentUser,
        setLoading,
        setError,
        setIsAuthenticated,
        setUser
    }
}