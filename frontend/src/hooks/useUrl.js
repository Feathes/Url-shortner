import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.jsx"

import { createUrl, getUrls, getUrl } from "../services/url.api.js"

export const useUrl = () => {
    const { user, loading, error, isAuthenticated, setError, setLoading } = useContext(AuthContext)

    const handleCreateUrl = async (longUrl, customUrl) => {
        setLoading(true)
        try {
            const res = await createUrl(longUrl, customUrl)
            return res
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.message || err.message)
            console.log("error in creating url : ", err)
            throw err
        }
        finally {
            setLoading(false)
        }
    }

    const handleGetAllUrls = async () => {
        setLoading(true)
        try {
            const res = await getUrls()
            return res
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.message || err.message)
            console.log("error in getting urls : ", err)
            throw err
        }
        finally {
            setLoading(false)
        }
    }


    const handleGetUrlById = async (id) => {
        setLoading(true)
        try {
            const res = await getUrl(id)
            return res
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.message || err.message)
            console.log("error in getting url : ", err)
            throw err
        }
        finally {
            setLoading(false)
        }
    }



    return {
        user,
        loading,
        error,
        isAuthenticated,
        handleCreateUrl,
        handleGetAllUrls,
        handleGetUrlById
    }
}