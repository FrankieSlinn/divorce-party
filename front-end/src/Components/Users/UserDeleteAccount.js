import { useNavigate, useParams } from 'react-router-dom'
import React from 'react'
import { deleteOneUser, getAllUsers, getToAccountPage } from './api';

export default function UserDeleteAccount(props) {
    const params = useParams()
    const navigate = useNavigate();

    async function handleDelete() {
        console.log('handledelete clicked')
        const response = await deleteOneUser(params.id)
        console.log('delete function ran')
        navigate(`/users/deleteSuccessful`)

        console.log(response)
        if (response.error) {
            alert('error user could not be deleted')
        } else {
            await getAllUsers()
                .then(results => results.json())
                .then(data => {
                props.setUsers(data)})

        }}

        async function handleCancel() {

            let token = JSON.parse(localStorage.getItem('divorceJWT'))       
            let response = await getToAccountPage(params.id, token)
            console.log(response)
    
            if (response.status === 401) {
                navigate('/users/login')
            }
            if (response.status === 200) {
                navigate(`/users/${params.id}/account`)
            }}

        

  return (
    <div>
        <ul>
            <li className='py-2'>  <h1> Are you sure you want to delete your account??</h1></li>
            <li className='py-2'> <button type="button" onClick={handleDelete}>Yes, delete my account</button></li>
            <li className='py-2'> <button type="button" onClick={handleCancel}>Cancel</button></li>
        </ul> 
    </div>
  )
}
