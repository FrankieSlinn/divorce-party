export const getAllUsers = async () => {
    return fetch('http://localhost:5000/users')
}

export const getOneUser = async (id) => {
    return fetch(`http://localhost:5000/users/${id}`)
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

return response.json();
}