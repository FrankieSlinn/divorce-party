

export const getAllUsers = async () => {
    return fetch('http://localhost:5000/users')
}


export const getOneUser = async (id) => {
    return fetch(`http://localhost:5000/users/${id}`)
}


export const findOnLogIn = async (loginData) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(loginData)
    };

    const url = 'http://localhost:5000/users/login'
    const response = await fetch(url, fetchOptions);
   

return response.json();
}


export const createNewUser = async (newUser) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newUser)
    };

    const url = 'http://localhost:5000/users'
    const response = await fetch(url, fetchOptions);

if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
}

return response.json();
}


export const deleteOneUser = async (id) => {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }};

    const url = `http://localhost:5000/users/${id}`
    const response = await fetch(url, fetchOptions);

if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
}

return response.json();
}


export const updateOneUser = async (updatedUser) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(updatedUser)
    };

    const url = `http://localhost:5000/users/${updatedUser._id}`
    const response = await fetch(url, fetchOptions);

if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
}

}


export const getUserPosts = (id) => {
    return fetch(`http://localhost:5000/users/${id}/posts`)
}

export const getOneUserPost = (id, postId) => {
    return fetch(`http://localhost:5000/users/${id}/posts/${postId}`)
}

export const getToDeleteAccountPage = async (id, token) => {
    console.log(token.token)
    console.log(id)
    const url = `http://localhost:5000/users/${id}/account/delete`
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token 
    }}

    try {
        const response = await fetch(url, fetchOptions);
        console.log(response)
        const data = await response.json()
        console.log('data:')
        console.log(data)
        return data
    } catch(error) {
        console.log(error)
    }
    
 
    }
    