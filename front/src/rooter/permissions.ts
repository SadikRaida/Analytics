export const ROLES = {
    ADMIN: "ROLE_ADMIN",
    USER: "ROLE_WEBMASTER"
};

export const SCOPES = {
    USER: "SCOPE_USER",
    ADMIN: "SCOPE_ADMIN"
};

export const PERMISSIONS = {
    [ROLES.ADMIN]: [SCOPES.ADMIN],
    [ROLES.USER]: [SCOPES.USER],
    null: []
};

interface User {
    role: string;
}
export const useRole = (user : User): string |null => {
    if(user) {
        if(user.role === ROLES.ADMIN)
            return ROLES.ADMIN;
        else if(user.role === ROLES.USER)
            return ROLES.USER;
        else
            return null;
    }
    return null;
}

interface Permission {
    permissions: string[];
    scopes: string[];
}

export const hasPermissions = ({ permissions , scopes} : Permission ) => {
    const userScopes: {[string: string]:boolean} = {} ;
    scopes.forEach((scope :string  )  => {
        userScopes[scope] = true
    });

    return permissions.some((permission: string)  => userScopes[permission]);
}