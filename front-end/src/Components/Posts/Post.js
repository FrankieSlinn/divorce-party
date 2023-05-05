import React from 'react'

export default function Post(props) {
    return (
    
        <div>
           <div className='p-4'>
             <h2 className='font-bold text-lg'>{props.title}</h2>
             <p className='text-justify'>{props.content}</p>

           </div>
       </div>
     )
}
