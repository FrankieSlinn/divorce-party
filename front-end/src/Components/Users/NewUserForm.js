import React from 'react'
import { useState } from 'react';
import { createNewUser, getAllUsers } from './api';
import { useNavigate } from "react-router-dom";

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



// const [shipIsBroken, setShipIsBroken] = useState(true)


async function handleFormSubmit(e) {
  e.preventDefault()
  console.log(formData)
  const newUser = await createNewUser(formData)
  const id = newUser._id

  await getAllUsers()
  .then(results => results.json())
  .then(data => {
      props.setUsers(data)})

  setFormData(template)
  navigate(`/users/${id}`)
}


  return (
    <div className='form-div'>
        <form onSubmit={handleFormSubmit}>
            <h1>Sign Up</h1>
            <ul>
                <li>Username: <input name='username' onChange={handleFormChange}></input></li>
                <li>Display Name: <input name='name' onChange={handleFormChange}></input></li>
                <li>Password: <input name='password' type='password' onChange={handleFormChange}></input></li>
            </ul>
            <div className='form-btns'>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    </div>
  )
}