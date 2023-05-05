import React from "react";
import { useState, useEffect } from "react";
import Post from "./Post";
import { getAllPosts } from "../../api";

export default function Posts(props) {
  // Display Posts

  useEffect(() => {
    getAllPosts()
      .then((data) => data.json())
      .then((newPosts) => props.setPosts(newPosts));
  }, []);

  //PostAPI

  const postAPI = function () {
    fetch("http://172.17.28.19:5000/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        author: props.author,
        title: props.title,
        content: props.content,
      }),
    })
      .then((data) => data.json())
      .then((posts) => console.log(posts));
  };

  //DeleteAPI

  const deleteAPI = function () {
    fetch(`http://172.17.28.19:5000/posts/${props.id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((posts) => console.log(posts));
  };

  let allPosts = <h3>No Posts</h3>;

  if (props.posts.posts) {
  }
  if (props.posts.posts) {
    if (props.posts.posts.length > 0) {
      allPosts = props.posts.posts.map((post, index) => {
        return (
          <Post
            id={post._id}
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
    if (props.author !== "" && props.content !== "") {
      postAPI();
    }
  }

  //ensure post API Call doesn't run longer than necessary
  useEffect(function () {
    if (props.author !== "" && props.content !== "") {
      postAPI();
    }
  }, []);

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

  return (
    <div>
      <h1>POSTS</h1>
      {allPosts}

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
          value={props.content}
          onChange={changeContent}
        ></input>
        <br />
        <br />
        <button type="submit" onClick={createPost}>
          Submit New Post
        </button>
      </form>
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
    </div>
  );
}
