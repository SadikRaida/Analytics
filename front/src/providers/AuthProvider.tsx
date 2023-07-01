import {createContext, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import AuthService from "../services/AuthService.ts";
import jwt_decode from "jwt-decode";

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
        if(!user) {
            if (localStorage.getItem("token") === null) {
                if (window.location.pathname !== "/login")
                    window.location.pathname = "/login";
            }
        }

        if (localStorage.getItem("token") !== null) {
            const decoded = jwt_decode(localStorage.getItem("token"));
            if (decoded.sub){
                AuthService.getUser(decoded.sub).then((response) => {
                    setUser(response);
                })
            }
        }
    },[])

    return (
        <AuthContext.Provider value={{user , setUser}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuthContext = () => useContext(AuthContext) ;