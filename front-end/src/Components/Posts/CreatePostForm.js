import { useState, useEffect } from "react";
export default function CreatePostForm(props) {
  console.log("props in create", props)

  //Set up use state to display the form as needed
  
  const [showCreatePost, setShowCreatePost] = useState(false);


  //Create a Post

  //Define API 

  const postAPI = function () {
    fetch("http://localhost:5000/posts", {
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

  //Ensure form not displayed after submit.

  function handleCreateFormSubmit(e) {
    e.preventDefault();
    setShowCreatePost(false);
    props.setTitle("")
    props.setAuthor("");
    props.setContent("");

  }


  //Run API if required fields present

  function createPost(e) {
    if (props.author !== "" && props.content !== "") {
      postAPI();
    }
  }

  //Ensure not more API Calls made than necessary

  useEffect(function () {
    if (props.author !== "" && props.content !== "") {
      postAPI();
    }
  }, []);

  //Update the fields that will be used in the API based on what the user types in the input field. 

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
  function handleImage(e){
    e.preventDefault();
  }

  return (
    <>
      <button 
        className="font-bold"
        onClick={() => {
          setShowCreatePost(true);
        }}
        style={{ display: showCreatePost ? "none" : "inline-block" }}
      >
        Add a Post
      </button>

      <form
        class="postform"
        style={{ display: showCreatePost ? "inline-block" : "none" }}
        onSubmit={handleCreateFormSubmit}
      >
        <h2 className="font-bold text-xl pb-4 ">Add a Post</h2>
        <br/>
        <label className = "font-bold" for="author">Author</label>
        &nbsp; &nbsp; <input id="author" value={props.author} onChange={changeAuthor} required></input>
        <br />
        <br />
        <label className="font-bold" for="title">Title</label>
        &nbsp; &nbsp; 
        <input id="title" value={props.title} onChange={changeTitle}></input>
        <br />
        <br />
        <label className="font-bold" for="content">Content</label>
        &nbsp; &nbsp;
        <input
          id="content"
          value={props.content}
          onChange={changeContent}
          required
        ></input>
        <br />
        <br />
        <label for="fileP1" class="uploadP1 upload"></label>
                    ...or click HERE to choose a picture file(png, gif or jpeg)
                <input onChange={handleImage} type="file" id="fileP1" name="filename" accept="image/png, image/gif, image/jpeg" multiple="false"></input>
        <button type="submit" onClick={createPost}>
          Submit New Post
        </button>
        <br />
        <button type="submit" onClick={handleCreateFormSubmit}>
          Cancel
        </button>
      </form>
    </>
  );
}
