import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {

  return (
    <div className=' items-center h-24 max-w-[1240px] mx-auto px-10 text-[black]'>
        <h1 className='w-full content-center text-3xl font-bold text-[black]'>Divorce Party Guest Book</h1>
        <ul className='flex'>
            <li className='p-4'><Link to='/'>Home</Link></li>
            <li className='p-4'><Link to='/posts'>Posts</Link></li>
            <li className='p-4'><Link to='/users'>Users</Link></li>
            <li className='p-4'><Link to='/users/create'>Sign Up</Link></li>
        </ul>
       
      
    </div>
  )
}
