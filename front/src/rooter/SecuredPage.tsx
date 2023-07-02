import { PERMISSIONS, hasPermissions, useRole } from "./permissions.ts";
import { useAuthContext } from "../providers/AuthProvider.tsx";
import PermissionDeniedPage from "../pages/error/PermissionDeniedPage.tsx";
import { ReactNode } from "react";

interface Permission {
    permissions: string[];
    scopes: string[];
}

export const SecuredPage = ({ children, scopes = [] }: { children: ReactNode, scopes: string[] }) => {
    const { user } = useAuthContext();
    if (user && user.role) {
        const role: string | null = useRole(user);

        // @ts-ignore
        if (scopes.length > 0) {
            let permissions
            if (role) {
                permissions = PERMISSIONS[role];
            }

            const isGranted = hasPermissions({ permissions, scopes } as Permission);
            if (!isGranted) {
                return <PermissionDeniedPage />;
            }
            return <>{children}</>; // Wrap the children in a React Fragment
        }
    }
    else if (localStorage.getItem("token") === null) {
        window.location.href = "/login";
    }
    return null; // Always return a React Element
}