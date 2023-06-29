// import {PERMISSIONS, hasPermissions, useRole} from "./permissions.ts";
// import {useAuthContext} from "../providers/AuthProvider.tsx";
//
// interface Permission {
//     permissions: string[];
//     scopes: string[];
// }
// export default function ({children , scopes= []}: {children: Element | Element[] , scopes: string[]}) {
//      const { user } = useAuthContext() ;
//      if(user && user.role) {
//          const role: string | null  = useRole(user) ;
//
//          // @ts-ignore
//          if(scopes.length > 0 ) {
//              let permissions
//              if(role) {
//                  permissions = PERMISSIONS[role] ;
//
//              }
//         }
//     }
//      else if (localStorage.getItem("token") === null) {
//          window.location.href = "/login";
//      }
// }