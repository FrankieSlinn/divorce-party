import React from "react";
import { useState, useEffect } from "react";
import Post from "./Post";
import { getAllPosts } from "../../api";

export default function Posts(props) {
  console.log("props in Posts", props, props.posts);

  // function showAllPosts() {
  //   getAllPosts()
  //     .then((data) => data.json())
  //     .then((newPosts) => props.setPosts(newPosts));
  // }

  // Display Posts

  useEffect(() => {
    getAllPosts()
      .then((data) => data.json())
      .then((newPosts) => props.setPosts(newPosts));
    console.log("posts after api in props.posts", props.posts);
  }, []);

  const postAPI=function(){fetch("http://172.17.28.19:5000/posts", {method: "post",       
  headers: {
          'Content-Type':'application/json',
          'Accept':'application/json'
      },
body: JSON.stringify({
 author: props.author, title:props.title,
  content: props.content
})
})
.then(data => data.json())
.then(posts => console.log(posts))}

  let allPosts = <h3>No Posts</h3>;

  if (props.posts.posts) {
    console.log("Posts are here!", props.posts);
  }
  if (props.posts.posts) {
    if (props.posts.posts.length > 0) {
      console.log("yes");
      allPosts = props.posts.posts.map((post, index) => {
        return (
          <Post
            author={post.author}
            title={post.title}
            content={post.content}
            posts={props.posts}
            setPosts={props.setPosts}
          />
        );
      });
    }
  }
 
  //Create a Post

 function createPost(e) {

  if(props.author!==""&&props.content!==""){
postAPI()}
  }

  //ensure post API Call doesn't run longer than necessary
useEffect(function(){ if(props.author!==""&&props.content!==""){postAPI()}}
, [])

  function changeAuthor(e) {
    e.preventDefault();
    props.setAuthor(e.target.value);
  }

  function changeTitle(e) {
    e.preventDefault();
    props.setTitle(e.target.value);
  }
  function changeContent(e) {
    e.preventDefault();
    props.setContent(e.target.value);
  }
  return (
    <div>
      {allPosts}
      {/* {props.posts} */}
      <h1>POSTS</h1>
      <h4>Add a Post</h4>
      <form class="postform">
        <label></label>
        <label for="author">Author</label>
        <input id="title" value={props.author} onChange={changeAuthor}></input>
        <br />
        <br />
        <label for="title">Title</label>
        <input id="title" value={props.title} onChange={changeTitle}></input>
        <br />
        <br />
        <label for="content">Content</label>
        <input
          id="content"
          width="500px"
          value={props.content}
          onChange={changeContent}
        ></input>
        <br />
        <br />
        <button type="submit" onClick={createPost}>
          Submit New Post
        </button>
      </form>
    </div>
  );
}
