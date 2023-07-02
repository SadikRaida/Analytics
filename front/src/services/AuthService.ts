import {ServicesBases} from "./servicesBases.ts";

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
                society: society,
                url: url,
                apikey: 'test'
            })
        });
        if(response.status === 401) {
            localStorage.removeItem('token');
        }
        return await response.json();
    } catch (error :any) {
        return error;
    }

}

const getUsers = async ():Promise<Response> => {
    const response = await fetch(ServicesBases.apiUrl + '/users', {
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

const verifyUser = async (id:string):Promise<Response> => {
    const response = await fetch(ServicesBases.apiUrl + '/users/' + id + '/verify', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await response.json();
}

const AuthService = {
    login,
    register,
    getUsers,
    getUser,
    verifyUser
}

export default AuthService;