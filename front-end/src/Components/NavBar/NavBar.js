import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {

  return (
        <ul className='font-semibold hidden md:flex items-center text-center justify-center mb-2'>
            <li className='p-4  hover:text-pink'><Link to='/'>Home</Link></li>
            <li className='p-4  hover:text-pink'><Link to='/posts'>Posts</Link></li>
            <li className='p-4  hover:text-pink'><Link to='/users'>Users</Link></li>
            <li className='p-4  hover:text-pink'><Link to='/users/create'>Sign Up</Link></li>
            <li className='p-4  hover:text-pink'><Link to='/users/login'>Log In</Link></li>
        </ul>

        
  )
}
