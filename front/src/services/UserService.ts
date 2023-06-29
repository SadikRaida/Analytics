const getAll = async () => {
    return fetch('http://localhost:4000/user')
        .then(res => res.json())
}

const get = async (id: number) => {
    return fetch(`http://localhost:4000/user/${id}`)
        .then(res => res.json())
}

const create = async (user: any) => {
    return fetch('http://localhost:4000/user', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
}

const update = async (id: number, user: any) => {
    console.log(user)
    return fetch(`http://localhost:4000/user/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
}

const remove = async (id: number) => {
    return fetch(`http://localhost:4000/user/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
}

const UserService = {
    getAll,
    get,
    create,
    update,
    remove,
};

export default UserService