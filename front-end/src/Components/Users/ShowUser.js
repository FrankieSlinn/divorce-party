import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneUser } from './api'
import Posts from '../Posts/Posts'

export default function ShowUser() {
    const params = useParams()
    const [user, setUser] = useState({})

    useEffect(() => {
        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            // console.log(data)
            setUser(data)})
    }, [params.id])


    let display;
   
    if (user.posts) {
      display = <Posts posts={user.posts}/>
    } else {
      display = <p>Loading...</p>
    }

  return (
    <div className='px-10 pb-5 pt-4'>
        <h2 className='text-2xl font-bold'>{user.name}</h2>
        <h2 className='text-xl pb-5'>{user.username}</h2>
        <div>
            <h2 className='text-2xl font-bold'>Posts:</h2>
            {display}
        </div>
    </div>
  )
}
