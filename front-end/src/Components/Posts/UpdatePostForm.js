import { useState, useEffect } from "react";


export default function UpdatePostForm(props){

    //Edit a Post

    //parameters defined to only show Edit Form if edit selected

    const [showEditPost, setShowEditPost] = useState(false);

    //Define API 

    const updateAPI = function(){
        if(props.idUpdate)
        props.setIdUpdate(props.idUpdate);
        console.log(
          "in update, id, auth, title",
          props.id,
          props.author,
          props.title
        );
        fetch(`http://localhost:5000/posts/${props.idUpdate}`, {
          method: "put",
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

function handleFormSubmit(e) {
    e.preventDefault();
    setShowEditPost(false);
  }

  //Run API if required fields present
  
  function editPost(){
    if (props.author !== "" && props.content !== "") {
      updateAPI() 
  }
}

   //Ensure not more API Calls made than necessary

   useEffect(function () {
    if (props.id !== "") {
      updateAPI();
    }
  }, []);

    //Update the fields that will be used in the API based on what the user types in the input field. 

    function changeUpdateId(e) {
        e.preventDefault();
        props.setIdUpdate(e.target.value);
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
      }

    return (
        <>        

        <button
    //Ensure Edit Form is displayed if the user clicks on the button
    onClick={() => {
    setShowEditPost(true);
    }}
    //Ensure Button not displayed when the Edit Form is shown
    style={{ display: showEditPost ? "none" : "inline-block" }}
    >Edit a Post</button>
      {/* Run handleFormSubmit Function, Ensure Edit Form is displayed if the user clicks on the button */}
        <form class="editform" onSubmit={handleFormSubmit} style={{ display: showEditPost ? "inline-block" : "none" }}>
        <h4>Edit a Post</h4>
          <label for="idUpdate">ID</label>
               {/* Here the user can type or paste the ID in the form that will reference the post to be edited*/}
          <input id="idUpdate" value={props.updateId} onChange={changeUpdateId}></input>
          <label for="author">Author</label>
          <input id="author" value={props.author} onChange={changeAuthor}></input>
          <label for="updateTitle">Title</label>
          <input id="updateTitle" value={props.title} onChange={changeTitle}></input>
          <label for="updateContent">Content</label>
          <input id="updateContent" value={props.content} onChange={changeContent}></input>
          <br />
          <br />
            {/* The API runs after the button has been clicked */}
          <button type="submit" onClick={editPost}>
            Edit Post
          </button>
        </form>
        <br />
        <br />
        </>
    )
}