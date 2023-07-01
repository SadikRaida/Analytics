import {PERMISSIONS, hasPermissions, useRole} from "./permissions.ts";
import {useAuthContext} from "../providers/AuthProvider.tsx";
import PermissionDeniedPage from "../pages/error/PermissionDeniedPage.tsx";
import {ReactNode} from "react";

interface Permission {
    permissions: string[];
    scopes: string[];
}
export default function ({children , scopes= []}: {children: Element | Element[] , scopes: string[]}) {
     const { user } = useAuthContext() ;
     if(user && user.role) {
         const role: string | null  = useRole(user) ;

         // @ts-ignore
         if(scopes.length > 0 ) {
             let permissions
             if(role) {
                 permissions = PERMISSIONS[role] ;
             }

             const isGranted = hasPermissions({permissions, scopes} as Permission  ) ;
             if(!isGranted) {
                 return <PermissionDeniedPage/> ;
             }
             return children ;
        }
    }
     else if (localStorage.getItem("token") === null) {
         window.location.href = "/login";
     }
}