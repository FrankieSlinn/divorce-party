import React from 'react'
import { useState } from 'react';
import { createNewUser, getAllUsers } from './api';
import { Link, useNavigate } from "react-router-dom";

export default function NewUserForm(props) {
  const navigate = useNavigate();

  const template = {

    username: '',
    name: '',
    password: '',
    posts: []
  }

const [formData, setFormData] = useState(template)
function handleFormChange(e) {
    const newInput = {...formData, [e.target.name]: e.target.value}
    console.log(newInput)
    setFormData(newInput)
}

function handleCancel() {
     navigate("/");
}

async function handleFormSubmit(e) {
  e.preventDefault()
  // console.log(formData)
  const newUser = await createNewUser(formData)

  if (newUser.error == "username already exists") {
    alert("The username you entered already exists, please choose a different username!")
  } else {
    const id = newUser._id

    await getAllUsers()
    .then(results => results.json())
    .then(data => {
        props.setUsers(data)})
  
    setFormData(template)
    navigate(`/users/${id}`)

  }


}


  return (
    <div className='h-100'>
        <form onSubmit={handleFormSubmit}>
            <h1 className='text-2xl font-bold pb-8'>Sign Up</h1>
            <ul className='flex flex-col'>
                <li className='py-1'><label>Username:</label></li>
                <li className='py-2'><input className='px-2 py-1' name='username' placeholder='JaneDoe93' onChange={handleFormChange}></input></li>
                <li className='py-1'><label>Display Name:</label></li>
                <li className='py-2'><input className='px-2 py-1' name='name' placeholder='Jane D.' onChange={handleFormChange}></input></li>
                <li className='py-1'><label>Password:</label></li>
                <li className='py-2'><input className='px-2 py-1' name='password' type='password' placeholder='enter password' onChange={handleFormChange}></input></li>
                <li className='py-2'><button type="submit">Submit</button></li>
                <li className='py-2'> <button type="button" onClick={handleCancel}>Cancel</button></li>
                <li>Already have an account? <Link to='/users/login'> Log In </Link> </li>
            </ul> 
        </form>
    </div>
  )
}