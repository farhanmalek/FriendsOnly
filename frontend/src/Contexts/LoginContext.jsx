import { createContext, useState, useEffect} from "react";
import axios from "axios";


//Create context and save it to a variable
const LoginContext = createContext();


export function LoginProvider({children}) {
    
    const [user, setUser] = useState({});
    const getUserData = async () => {
        try {
            const data = await axios.get("https://friends-only-eosin.vercel.app/", {
                withCredentials: true,
            })
            setUser(data.data);

        } catch (error) {
            console.log(error, "error getting user data")
            
        }
    }

    useEffect(() => {
    getUserData()
    }, [])
    

    return (
        <LoginContext.Provider value={{user, getUserData}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContext;