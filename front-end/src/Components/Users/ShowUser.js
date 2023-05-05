import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneUser } from './api'

export default function ShowUser() {
    const params = useParams()
    const [user, setUser] = useState({})

    useEffect(() => {
        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            // console.log(data)
            setUser(data)})
    }, [])


    

  return (
    <div>
        <div>
            <h2>{user.name}</h2>
            <h2>{user.username}</h2>

        </div>
      
    </div>
  )
}
