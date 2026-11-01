import axios from "axios";
const BASE_URL="/"

const api=axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})

export const getCurrentUser=async()=>{
   try {
    const res=await api.get("/auth/profile")
    return res.data
   } catch (error) {
    console.log("error in getting user : ",error)
    throw error
   }
}

export const signup=async(username,email,password)=>{
   try {
    const res=await api.post("/auth/register",{username,email,password})
    return res.data
   } catch (error) {
    console.log("error in signup : ",error)
    throw error
   }
}

export const login=async(email,password)=>{
    try {
        const res=await api.post("/auth/login",{email,password})
        return res.data
    } catch (error) {
        console.log("error in login : ",error)
        throw error
    }
}

export const logout=async()=>{
    try {
        const res=await api.get("/auth/logout")
        return res.data
    } catch (error) {
        console.log("error in logout : ",error)
        throw error
    }
}   

export const getProfile=async()=>{
    try {
        const res=await api.get("/auth/profile")
        return res.data
    } catch (error) {
        console.log("error in getting profile : ",error)
        throw error
    }
}