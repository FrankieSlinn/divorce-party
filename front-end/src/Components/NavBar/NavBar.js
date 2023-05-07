import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {

  return (
    <div className='fixed top-0 inset-x-0 bg-white text-[black]content-center  text-black dark:bg-gray-900 dark:text-white '>
        <h1 className='text-center text-3xl font-bold pt-5'>Divorce Party Guest Book</h1>
        <ul className='flex items-center text-center justify-center	'>
            <li className='p-4'><Link to='/'>Home</Link></li>
            <li className='p-4'><Link to='/posts'>Posts</Link></li>
            <li className='p-4'><Link to='/users'>Users</Link></li>
            <li className='p-4'><Link to='/users/create'>Sign Up</Link></li>
        </ul>
       
      
    </div>
  )
}
