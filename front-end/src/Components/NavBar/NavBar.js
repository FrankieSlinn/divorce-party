import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {

  return (
        <ul className='hidden md:flex items-center text-center justify-center'>
            <li className='p-4'><Link to='/'>Home</Link></li>
            <li className='p-4'><Link to='/posts'>Posts</Link></li>
            <li className='p-4'><Link to='/users'>Users</Link></li>
            <li className='p-4'><Link to='/users/create'>Sign Up</Link></li>
        </ul>

        
  )
}
