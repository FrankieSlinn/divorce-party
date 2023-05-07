import React, { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import NavBarSmallScreen from '../NavBar/NavBarSmallScreen'

export default function Header() {

    const [hamburger, setHamburger] = useState(false)

    function showMenu() {
        setHamburger(!hamburger)
    }

    const icons = {
        hamburger: (<svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" width="1.9em" height="1.9em" viewBox="0 0 16 16">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"/>
                    </svg>),
        close: (<svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" width="2.3em" height="2.em" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m7 7l10 10M7 17L17 7"/>
                </svg>)
    }

  return (
    <div className='fixed top-0 inset-x-0 bg-white text-[black]content-center  text-black dark:bg-gray-900 dark:text-white '>
        <h1 className='text-center text-3xl font-bold pt-5'>Divorce Party Guest Book</h1>
        <NavBar />
        <div className='flex justify-center mt-5 cursor-pointer md:hidden'> 
            {icons.hamburger}
        </div>
        <NavBarSmallScreen showMenu={showMenu} hamburger={hamburger} close={icons.close}/>

    </div>
  )
}
