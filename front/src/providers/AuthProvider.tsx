import {createContext, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import AuthService from "../services/AuthService.ts";

interface AuthContextInterface {
    user: User;
    setUser: (user: User) => void;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);
export default function AuthProvider({children}: { children: ReactNode }) {


    const [user, setUser] = useState<User>();


    useEffect(() => {
        // if(!user ) {
        //     if (localStorage.getItem("token") === null) {
        //         if (window.location.pathname !== "/login")
        //             window.location.pathname = "/login";
        //     }
        // }

    },[])



    return (
        <AuthContext.Provider value={{user , setUser}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuthContext = () => useContext(AuthContext) ;