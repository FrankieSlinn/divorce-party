import React from 'react'

export default function Post(props) {
    return (
    
        <div>
           <div>
             <h2>{props.title}</h2>
             <p>{props.content}</p>

           </div>
       </div>
     )
}
