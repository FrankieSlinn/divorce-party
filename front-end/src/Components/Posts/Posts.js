import React from 'react'
import Post from './Post'

export default function Posts(props) {
    let allPosts = <h3>No posts yet</h3>

    if (props.posts.length > 0) {
        allPosts = props.posts.map((post) => {
            return <Post author={post.author}
                            title={post.title}
                            content={post.content}
                            id={post._id}
                            key={post._id}
                            />
        })
    }

  return (
    <div>
        {allPosts}
    </div>
  )
}
