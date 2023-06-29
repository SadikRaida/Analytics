// import {ServicesBases} from "./servicesBases.ts";
//
// export const UserServices = {
//     getUsers: async () => {
//         try {
//             const response = await fetch(`${ServicesBases.apiUrl}/user`, {
//                 method: 'GET',
//             });
//             return await response.json();
//         } catch (e) {
//             console.log(e)
//         }
//     },
//     createUsers: async (data: any) => {
//         try {
//             const response = await fetch(`${ServicesBases.apiUrl}/user`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data),
//             });
//             return await response.json();
//         }catch (e) {
//             console.log(e)
//         }
//     },
//     deleteUser: async (id: number) => {
//         try {
//             const response = await fetch(`${ServicesBases.apiUrl}/user/${id}`, {
//                 method: 'DELETE',
//             });
//             return await response.json();
//         }catch (e) {
//             console.log(e)
//         }
//     }
// }