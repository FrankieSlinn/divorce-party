import React from 'react'
import User from './User'

export default function Users(props) {

    let allUsers = <h3>Loading...</h3>

   

    if (props.users.length > 0) {
        allUsers = props.users.map((user) => {
            return <User username={user.username}
                            name={user.name}
                            // posts={user.posts}
                            id={user._id}
                            key={user._id}
                            setUsers={props.setUsers}/>
        })
    }

  return (
    <div>
        <h1>Users</h1>
        {allUsers}
      
    </div>
  )
}
