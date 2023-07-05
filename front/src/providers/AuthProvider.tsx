import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import AuthService from "../services/AuthService.ts";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface AuthContextInterface {
    user: any;
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

    const navigate = useNavigate();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if(!user) {
            if (localStorage.getItem("token") === null) {
                if (window.location.pathname !== "/login")
                    navigate('/login');
            }
        }

        if (localStorage.getItem("token") !== null) {
            const token: string | null = localStorage.getItem("token");
            const decoded:any = jwt_decode(token as string);
            if (decoded.sub){
                AuthService.getUser(decoded.sub).then((response :any) => {
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