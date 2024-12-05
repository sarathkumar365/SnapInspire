import { createContext,useState,useEffect } from "react";

const  AuthContext = createContext({})

export const AuthProvider = ({ children }) => {  
        
    const [auth,setAuth] = useState(undefined)
    // console.log(`AUTH ${auth}`);

    useEffect(() => {

        // check if accessToken exists in local
        const token = localStorage.getItem('accessToken') || undefined 
        if(token) setAuth(token)

    },[])

    

    return (
        <AuthContext.Provider value = {{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;