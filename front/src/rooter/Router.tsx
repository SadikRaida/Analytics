import React, {ReactNode, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import {Dashboard} from "../pages/dashboard";
import {Login} from "../pages/Login";
import {Register} from "../pages/Register";

interface Route {
    path: string;
    name: string;
    element: Element | ReactNode ;
}

export const useRoutes = () => {

    const routes: Route[] = [
        {
            path: "/login",
            name: "Login",
            element:
                <Login/>
        },{
            path: "/register",
            name: "Register",
            element:
                <Register/>
        },
        {
            path:'/',
            name:'Dashboard',
            element:
                <Dashboard/>
        },
    ] ;


    return routes.map((route: Route) => {
       return <Route key={route.name} {...route}/>
    });
}

export default function Router() {
   const routes = useRoutes();
   return (
       <Suspense>
           <Routes>
               <Route path={'/'} element={<AppLayout/>}>
                   {
                          routes.map(route => route)
                   }
               </Route>
           </Routes>
       </Suspense>
   )
}