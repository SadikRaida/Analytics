import {ReactNode, Suspense} from "react";
import HomePage from "../pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import {Login} from "../pages/Login";
import {Register} from "../pages/Register";
import {SCOPES} from "./permissions";
import SecuredPage from "./SecuredPage";

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
            <SecuredPage scopes={[SCOPES.USER, SCOPES.ADMIN]}>
                <HomePage/>
            </SecuredPage>
        }
    ];

    return routes.map((route: Route) => {
       return <Route key={route.name} {...route}/>
    });
}

export default function Router() {
   const routes = useRoutes();
   return (
       <Suspense>
           <Routes>
               <Route element={<AppLayout/>}>
                   {
                       routes.map(route => route)
                   }
               </Route>
               <Route path={'/login'} element={<Login/>}/>
               <Route path={'/register'} element={<Register/>}/>
           </Routes>
       </Suspense>
   )
}