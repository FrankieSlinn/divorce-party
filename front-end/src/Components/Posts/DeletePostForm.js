import { useState, useEffect } from "react";

export default function DeletePostForm(props){

      //Set up use state to display the form as needed

    const [showDeletePost, setShowDeletePost] = useState(false);

    //Delete a Post

    //Define API 

   const deleteAPI= function(){fetch(`http://172.17.28.19:5000/posts/${props.id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((posts) => console.log(posts));
}

  //Ensure form not displayed after submit.

function handleFormSubmit(e) {
    e.preventDefault();
    setShowDeletePost(false);
  }

//Run API if required fields present
  
  function deletePost() {
    console.log("props.id in deletePost", props.id)
    if (props.id !== "") {
      deleteAPI();
    }
  }

 //Ensure not more API Calls made than necessary

  useEffect(function () {
    if (props.id !== "") {
      deleteAPI();
    }
  }, []);

    //Update the fields that will be used in the API based on what the user types in the input field. 

  function changeId(e) {
    e.preventDefault();
    props.setId(e.target.value);
  }

    return(
        <>
        <button

    //Ensure Delete Form is displayed if the user clicks on the button
        onClick={() => {
        setShowDeletePost(true);
        }}
    //Ensure Button not displayed when the Delete Form is shown
        style={{ display: showDeletePost ? "none" : "inline-block" }}
        >Delete a Post</button>
     {/* Run handleFormSubmit Function, Ensure Delete Form is displayed if the user clicks on the button */}
      <form class="deleteform" onSubmit={handleFormSubmit}  style={{ display: showDeletePost ? "inline-block" : "none" }}>
        <h4>Delete Post</h4>
        <label for="id">ID</label>
        {/* Here the user can type or paste the ID in the form that will reference the post to be deleted */}
        <input id="id" value={props.id} onChange={changeId}></input>
        <br />
        <br />
      
        <button type="submit" onClick={deletePost}>
          Delete Post
        </button>
      </form>
      <br />
      <br />
        </>
    )
}