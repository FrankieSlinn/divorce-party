import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOneUser, getOneUserPost } from './api'

export default function ShowUserPost() {
    const params = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        getOneUserPost(params.id, params.postId)
        .then(results => results.json())
        .then(data => {
            setPost(data)})
    }, [params.id, params.postId])

    let display;
   
    if (post) {
        display = <div className='flex flex-col py-5 px-10 text-center items-center'>
                        <h2 className='block font-bold text-lg'>{post.title}</h2>
                        <p className='text-justify'>{post.content}</p>
                    </div>

    } else {
      display = <p>Loading...</p>
    }
  
  return (
    <div>
        {display}
    </div>
  )
}
