import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getToAccountPage } from '../Users/api';

export default function NavBar(props) {
  const navigate = useNavigate();

  async function gotToAccount() {
    console.log('accout clicked')
    let token = JSON.parse(localStorage.getItem('divorceJWT')) 
    // console.log('props:')
    // console.log(token)
    // if (props.userLoggedIn) {
      // const id = props.userLoggedIn[0]._id   
      if (token) {
        const id = token.id  
        let response = await getToAccountPage(id, token)
     
    if (response.status === 200) {
      navigate(`/users/${id}/account`)
        
    } } else {
      navigate('/users/login')
    }

    
   
    

  }


  return (
        <ul className='font-semibold hidden md:flex items-center text-center justify-center mb-2'>
            <li className='p-4  hover:text-pink'><Link to='/'>Home</Link></li>
            <li className='p-4  hover:text-pink'><Link to='/posts'>Posts</Link></li>
            <li className='p-4  hover:text-pink'><Link to='/users'>Users</Link></li>
            <li className='p-4  hover:text-pink hover:cursor-pointer' onClick={gotToAccount}>Account</li>
            <li className='p-4  hover:text-pink'><Link to='/users/create'>Sign Up</Link></li>
            <li className='p-4  hover:text-pink'><Link to='/users/login'>Log In</Link></li>
        </ul>

        
  )
}
