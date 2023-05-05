import React from 'react'
import {useState, useEffect } from "react"
import Post from "./Post"
import { getAllPosts } from '../../api'



export default function Posts(props) {
  
  console.log("props in Posts", props, props.posts)


function showAllPosts(){getAllPosts()
.then(data => data.json())
.then(newPosts => props.setPosts(newPosts))}

// showAllPosts()



useEffect(() => {
    getAllPosts()
      .then(data => data.json())
  .then(newPosts => props.setPosts(newPosts))
  console.log("posts after api in props.posts", props.posts)
  }, [])

  let allPosts = <h3>No Posts</h3>
 
  if(props.posts.posts){ 
 console.log("Posts are here!", props.posts)
  }
     if(props.posts.posts) {if(props.posts.posts.length> 0 ){
      console.log("yes")
          allPosts = props.posts.posts.map((post, index)=>{
   
              
              return <Post 
                        author={post.author}
                        title ={post.title}
                          content = {post.content}
                        posts={props.posts}
                        setPosts={props.setPosts}
              
                       />          })  }}

  function createPost(){
    console.log("create")
  }

  function changeAuthor(e){
    e.preventDefault()
    props.setAuthor(e.target.value)
}

  function changeTitle(e){
    e.preventDefault()
    props.setTitle(e.target.value)
}
function changeContent(e){
  e.preventDefault()
  props.setContent(e.target.value)
}
  return (
    <div>
      {allPosts}
      {/* {props.posts} */}
        {/* <h1>POSTS</h1>
        <h4>Add a Post</h4>
        <form class="postform" >
        <label></label>
        <label for="author">Author</label>
        <input  id="title"  value={props.author} onChange={changeAuthor}></input>
        <br />
        <br />
        <label for="title">Title</label>
        <input  id="title"  value={props.title} onChange={changeTitle}></input>
        <br />
        <br />
        <label for="entry">Content</label>
        <input  id="entry"  width = "500px" value={props.content} onChange={changeContent}></input>
        <br />
        <br />
        <button type="submit" onClick={createPost}>Submit New Post</button>
        </form> */}
      
    </div>
  )
}
