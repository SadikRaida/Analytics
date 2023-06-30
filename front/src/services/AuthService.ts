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

const register = async ():Promise<Response> => {
    try {
        const response = await fetch(ServicesBases.apiUrl + '/authentication/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });
        if(response.status === 401) {
            localStorage.removeItem('token');
        }
        return await response.json();
    } catch (error) {
        return error;
    }

}

const AuthService = {
    login,
    register
}

export default AuthService;