import React from 'react'

export default function User(props) {
  return (
    
     <div>
        <div>
          <h2>{props.name}</h2>
          <h2>{props.username}</h2>
          <h3 className='log-entry'>{props.entry}</h3>
        </div>
    </div>
  )
}
