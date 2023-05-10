import React from 'react'
import { useState } from 'react';
import { createNewUser, findOnLogIn, getAllUsers, getOneUser } from './api';
import { Link, useNavigate } from "react-router-dom";

export default function NewUserForm(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({})

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
    await getAllUsers()
    .then(results => results.json())
    .then(data => {
        props.setUsers(data)})
  
  const userData = await findOnLogIn(formData)
  const token = {token: userData.token}
  localStorage.setItem("divorceJWT", JSON.stringify(token))

  const user = userData.user

  if (userData.error) {
    alert("Invalid username or password, couldn't log in!")
  } else {
    const id = user[0]._id
    setFormData(template)
    navigate(`/users/${id}/account`)


    setFormData(template)
    

  }


}}


  return (
    <div className='h-100'>
        <form onSubmit={handleFormSubmit}>
            <h1 className='text-2xl font-bold pb-8'>Sign Up</h1>
            <ul className='flex flex-col'>
                <li className='py-1'><label>Username:</label></li>
                <li className='py-2'><input className='px-2 py-1' name='username' required placeholder='JaneDoe93' onChange={handleFormChange}></input></li>
                <li className='py-1'><label>Display Name:</label></li>
                <li className='py-2'><input className='px-2 py-1' name='name' required placeholder='Jane D.' onChange={handleFormChange}></input></li>
                <li className='py-1'><label>Password:</label></li>
                <li className='py-2'><input className='px-2 py-1' name='password' required type='password' placeholder='enter password' onChange={handleFormChange}></input></li>
                <li className='py-2'><button type="submit">Submit</button></li>
                <li className='py-2'> <button type="button" onClick={handleCancel}>Cancel</button></li>
                <li>Already have an account? <Link to='/users/login'> Log In </Link> </li>
            </ul> 
        </form>
    </div>
  )
}