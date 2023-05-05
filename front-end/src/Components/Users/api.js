export const getAllUsers = async () => {
    return fetch('http://localhost:5000/users')
}

export const getOneUser = async (id) => {
    return fetch(`http://localhost:5000/users/${id}`)
}

export const deleteOneUser = async () => {}

export const createNewUser = async () => {}

export const updateOneUser = async () => {}