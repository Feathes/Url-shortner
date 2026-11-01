import { createContext, useState ,useEffect} from "react";
import { getProfile } from "../services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
      getProfile().then((res)=>{
        setUser(res.user)
        setIsAuthenticated(true)
      }).catch((err)=>{
        console.log("error in getting profile : ",err)
      })
    },[user])


    return(
        <AuthContext.Provider
            value={{
                user,
                loading,
                setLoading,
                error,
                setError,
                isAuthenticated,
                setIsAuthenticated,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>

    )
}