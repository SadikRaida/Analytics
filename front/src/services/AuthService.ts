import {ServicesBases} from "./servicesBases.ts";
import jwt_decode from "jwt-decode";


const login = async (email:string, password:string):Promise<Response> => {
    const response = await fetch(ServicesBases.apiUrl + '/authentication/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    });
    return await response.json();
}

const register = async (email:string, password:string, society:string, url:string):Promise<Response> => {
    try {
        const response = await fetch(ServicesBases.apiUrl + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                email: email,
                password: password,
                society: password,
                url: url,
                apikey: 'test'
            })
        });
        if(response.status === 401) {
            localStorage.removeItem('token');
        }
        return await response.json();
    } catch (error) {
        return error;
    }

}

const getUsers = async ():Promise<Response> => {
    const response = await fetch(ServicesBases.apiUrl + '/authentication/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
}

const getUser = async (id:string):Promise<Response> => {
    const response = await fetch(ServicesBases.apiUrl + '/users/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
}

const AuthService = {
    login,
    register,
    getUsers,
    getUser
}

export default AuthService;