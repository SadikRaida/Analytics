import { ReactNode, Suspense } from "react";
import { HomePage } from "../pages/HomePage.tsx";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { SCOPES } from "./permissions";
import { SecuredPage } from "./SecuredPage";

interface Route {
    path: string;
    name: string;
    element: ReactNode;
}

export const useRoutes = () => {

    const routes: Route[] = [
        {
            path: "/",
            name: "Home",
            element:
                <SecuredPage scopes={[SCOPES.USER, SCOPES.ADMIN]}>
                    <HomePage />
                </SecuredPage>
        }
    ];

    return routes.map((route: Route) => {
        return <Route key={route.name} path={route.path} element={route.element} />;
    });
}

export default function Router() {
    const routes = useRoutes();
    return (
        <Suspense fallback={<div>Loading...</div>}> {/* You should provide a fallback */}
            <Routes>
                <Route element={<AppLayout />} path={'/'} index={false}>
                    {routes}
                </Route>
                <Route path={'/login'} element={<Login />} index={true} />
                <Route path={'/register'} element={<Register />} index={true} />
            </Routes>
        </Suspense>
    )
}