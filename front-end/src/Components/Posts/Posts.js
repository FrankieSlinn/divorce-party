import React from "react";
import { useState, useEffect } from "react";
import Post from "./Post";
import { getAllPosts } from "./Postapi";
// import {postAPI} from "./Postapi";
import {deleteAPI} from "./Postapi";
import {updateAPI} from "./Postapi";
import CreatePostForm from "./CreatePostForm.js"

export default function Posts(props) {


  // Display Posts

  useEffect(() => {
    getAllPosts()
    .then((data) => data.json())
    .then((newPosts) => props.setPosts(newPosts));
  }, []);



  //Map data into individual post elements

  let allPosts = <h3>No Posts</h3>;

  if (props.posts.posts) {
  }
  if (props.posts.posts) {
    if (props.posts.posts.length > 0) {
      allPosts = props.posts.posts.map((post, index) => {
        return (
          <Post
            id={post._id}
            // updateId={post.updateId}
            author={post.author}
            // updateAuthor={post.updateAuthor}
            title={post.title}
            updateTitle={post.updateTitle}
            content={post.content}
            updateContent={post.updateContent}
            posts={props.posts}
            setPosts={props.setPosts}
            key={props.index}
          />
        );
      });
    }
  }

  
  //Delete Post
  function deletePost() {
    if (props.id !== "") {
      deleteAPI();
    }
  }

  useEffect(function () {
    if (props.id !== "") {
      deleteAPI();
    }
  }, []);

  function changeId(e) {
    e.preventDefault();
    props.setId(e.target.value);
  }

  //Update Post

  function changeUpdateId(e) {
    e.preventDefault();
    props.setId(e.target.value);
  }
  function editPost(){

    props.setAuthor(props.updateAuthor)
    props.setTitle(props.updateTitle)
    props.setContent(props.updateContent)

    if (props.author !== "" && props.content !== "") {

      updateAPI() 
  }
}
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
}//ensure post API Call doesn't run longer than necessary

  return (
    <div>

      <h1>POSTS</h1>
      {allPosts}
    <CreatePostForm
 
    id={props.id}
    setId={props.setID}
    author={props.author}
    setAuthor={props.setAuthor}
    title={props.title}
    setTitle={props.setTitle}
    content={props.content}
    setContent={props.setContent}/>

     
      <h4>Delete a Post</h4>
      <form class="deleteform">
        <label for="id">ID</label>
        <input id="id" value={props.id} onChange={changeId}></input>
        <br />
        <br />
        <button type="submit" onClick={deletePost}>
          Delete Post
        </button>
      </form>
      <br />
      <br />
      <h4>Edit a Post</h4>
      <form class="editform">
        <label for="updateId">ID</label>
        <input id="updateId" value={props.updateId} onChange={changeUpdateId}></input>
        <label for="author">Author</label>
        <input id="author" value={props.author} onChange={changeAuthor}></input>
        <label for="updateTitle">Title</label>
        <input id="updateTitle" value={props.title} onChange={changeTitle}></input>
        <label for="updateContent">Content</label>
        <input id="updateContent" value={props.content} onChange={changeContent}></input>
        <br />
        <br />
        <button type="submit" onClick={editPost}>
          EditPost
        </button>
      </form>

      <br />
      <br />
    </div>
  );
}


