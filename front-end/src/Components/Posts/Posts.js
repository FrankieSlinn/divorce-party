import React from "react";
import { useState, useEffect } from "react";
import Post from "./Post";
import { getAllPosts } from "../../api";

export default function Posts(props) {
  console.log("props in posts", props)

  //APIs

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

  //UpdateAPI
  const updateAPI=function(){
    props.setId(props.updateId)
    console.log("in update, id, auth, title", props.id, props.author, props.title)
    fetch(`http://172.17.28.19:5000/posts/${props.id}`, {method: "put",       
    headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
  body: JSON.stringify({
   author: props.author, title: props.title,
    content: props.content
  })
})
.then(data => data.json())
.then(posts => console.log(posts))
  }

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

  //Create a Post

  function createPost(e) {
    if (props.author !== "" && props.content !== "") {
      postAPI();
    }
  }

  //ensure not more API Calls made than necessary
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

  //Update Post


  // function changeAuthor(e) {
  //   e.preventDefault();
  //   props.setAuthor(e.target.value);
  //   console.log("updateAuthor in changeupdate author", props.updateAuthor)
  // }
  // function changeTitle(e) {
  //   e.preventDefault();
  //   props.setTitle(e.target.value);
  // }
  // function changeContent(e) {
  //   e.preventDefault();
  //   props.setContent(e.target.value);
  // }
  function changeUpdateId(e) {
    e.preventDefault();
    props.setId(e.target.value);
  }
  function editPost(){
    console.log("editPost running")
    props.setAuthor(props.updateAuthor)
    props.setTitle(props.updateTitle)
    props.setContent(props.updateContent)
    console.log("props for id, author, title, content", props.id, props.author, props.title)
    console.log("update props", props.updateId, props.updateAuthor)
    if (props.author !== "" && props.content !== "") {
      console.log("update API is running!!!!")
      console.log("just before api author, content", props.author, props.updateContent)
      updateAPI()

  
   
  }
}
    //ensure post API Call doesn't run longer than necessary
    useEffect(function () {
      if (props.author !== "" && props.content !== "") {
        postAPI();
      }
    }, []);


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


