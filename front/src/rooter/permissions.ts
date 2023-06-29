// export const ROLES = {
//     ADMIN: "ROLE_ADMIN",
//     SUPPORT: "ROLE_SUPPORT",
//     CONSULTANT: "ROLE_CONSULTANT"
// };
//
// export const SCOPES = {
//     CONSULTANT: "SCOPE_CONSULTANT",
//     SUPPORT: "SCOPE_SUPPORT",
//     ADMIN: "SCOPE_ADMIN"
// };
//
// export const PERMISSIONS = {
//     [ROLES.ADMIN]: [SCOPES.CONSULTANT, SCOPES.SUPPORT, SCOPES.ADMIN],
//     [ROLES.SUPPORT]: [SCOPES.CONSULTANT, SCOPES.SUPPORT],
//     [ROLES.CONSULTANT]: [SCOPES.CONSULTANT],
//     null: []
// };
//
// export const EXPERTISES = {
//     JUNIOR: 'Argile Fragile',
//     CONFIRME: 'Terre Cuite',
//     SENIOR: 'Céramique Etincelante',
//     EXPERT: 'Carbon Poli'
// }
//
// interface User {
//     role: string;
// }
// export const useRole = (user : User): string |null => {
//     if(user) {
//         if(user.role === ROLES.ADMIN)
//             return ROLES.ADMIN;
//         else if(user.role === ROLES.SUPPORT)
//             return ROLES.SUPPORT;
//         else if(user.role === ROLES.CONSULTANT)
//             return ROLES.CONSULTANT;
//         else
//             return null;
//     }
//     return null;
// }
//
// interface Permission {
//     permissions: string[];
//     scopes: string[];
// }
//
// export const hasPermissions = ({ permissions , scopes} : Permission ) => {
//     const userScopes: {[string: string]:boolean} = {} ;
//
//     scopes.forEach((scope :string  )  => {
//         userScopes[scope] = true
//     });
//
//     return permissions.some((permission: string)  => userScopes[permission]);
// }