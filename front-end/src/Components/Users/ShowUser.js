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
    <div>
        <div>
            <div>
            <h2>{user.name}</h2>
            <h2>{user.username}</h2>
            <h2>Posts:</h2>
                {display}
            </div>

        </div>
      
    </div>
  )
}
