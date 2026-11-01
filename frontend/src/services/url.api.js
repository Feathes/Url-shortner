import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL || "/";

const api=axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})

export const createUrl=async(longUrl,customUrl)=>{
   try {
    const response=await api.post("/url/",{longUrl,customUrl})
    return response.data
   } catch (error) {
    console.log("error in creating url : ",error)
    throw error
   }
}

export const getUrls=async()=>{
   try {
    const response=await api.get("/url/")
    return response.data
   } catch (error) {
    
    console.log("error in getting urls : ",error)
    throw error
   }
}


export const getUrl=async(id)=>{
   try {
    const response=await api.get(`/url/${id}`)
    return response.data
   } catch (error) {
    console.log("error in getting url : ",error)
    throw error
   }
}


