import React from 'react'

export default function Post(props) {
  return (
    <div>
        <div className ="post">
            <h3>Title: {props.title}</h3>
            <p>
                Entry: {props.content}
            </p>
            <p>Author: {props.author}</p>

        </div>
      
    </div>
  )
}
