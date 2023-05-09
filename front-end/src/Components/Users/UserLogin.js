import React from 'react'
import { useState } from 'react';
import { findOnLogIn } from './api';
import { Link, useNavigate } from "react-router-dom";

export default function UserLogin(props) {
  const navigate = useNavigate();

  const template = {
    username: '',
    password: '',
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
  const user = await findOnLogIn(formData)
  if (user.error) {
    alert("Invalid username or password, couldn't log in!")
  } else {
    const id = user[0]._id
    setFormData(template)
    navigate(`/users/${id}`)

  }

}


  return (
    <div className='h-100'>
        <form onSubmit={handleFormSubmit}>
            <h1 className='text-2xl font-bold pb-8'>Log In</h1>
            <ul className='flex flex-col'>
                <li className='py-1'><label>Username:</label></li>
                <li className='py-2'><input className='px-2 py-1' name='username' required onChange={handleFormChange}></input></li>
                <li className='py-1'><label>Password:</label></li>
                <li className='py-2'><input className='px-2 py-1' name='password' required type='password' onChange={handleFormChange}></input></li>
                <li className='py-2'><button type="submit">Submit</button></li>
                <li className='py-2'> <button type="button" onClick={handleCancel}>Cancel</button></li>
                <li>Don't have an account? <Link to='/users/create'> Sign Up </Link> </li>
                
            </ul> 
        </form>
    </div>
  )
}