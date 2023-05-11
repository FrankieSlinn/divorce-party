import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getToAccountPage } from '../Users/api';


export default function NavBarSmallScreen({ showMenu, hamburger, close, userLoggedIn }) {
  const navigate = useNavigate();

  async function gotToAccount() {
   
    let token = JSON.parse(localStorage.getItem('divorceJWT')) 

    if (token) {
      const id = token.id  
      let response = await getToAccountPage(id, token)
   
  if (response.status === 200) {
    navigate(`/users/${id}/account`)
    showMenu()
      
  } } else {
    navigate('/users/login')
    showMenu()
  }


    
   
    

  }
  
    
  return (
    <ul className={hamburger ? 'flex-col flex fixed inset-0 top-1/4  bg-black/60 backdrop-blur-lg text-white text-xl dark:bg-slate-600/50 md:hidden' : 'hidden'}>
        <li className='p-4 mt-20 flex justify-center items-center cursor-pointer'>{close}</li>
        <li onClick={showMenu} className='p-4'><Link to='/'>Home</Link></li>
        <li onClick={showMenu} className='p-4'><Link to='/posts'>Posts</Link></li>
        <li onClick={showMenu} className='p-4'><Link to='/users'>Users</Link></li>
        <li className='p-4  hover:text-pink hover:cursor-pointer' onClick={gotToAccount}>Account</li>
        <li onClick={showMenu} className='p-4'><Link to='/users/create'>Sign Up</Link></li>
        <li onClick={showMenu} className='p-4'><Link to='/users/login'>Log In</Link></li>
    </ul>
  )
}
