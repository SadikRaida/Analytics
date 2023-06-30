import {ReactNode, Suspense} from "react";
import HomePage from "../pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
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
            path: "/",
            name: "Home",
            element:
                <HomePage/>
        },{
            path: "/login",
            name: "Home",
            element:
                <Login/>
        },{
            path: "/register",
            name: "Home",
            element:
                <Register/>
        }
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
                {/*<Route path={'/login'} element={<Login/>}/>*/}
           </Routes>
       </Suspense>
   )
}