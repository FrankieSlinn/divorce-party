import { useState, useEffect } from "react";

export default function DeletePostForm(props){

    console.log("props in deleteform", props)
    const [showDeletePost, setShowDeletePost] = useState(false);

   const deleteAPI= function(){fetch(`http://172.17.28.19:5000/posts/${props.id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((posts) => console.log(posts));
}

function handleFormSubmit(e) {
    e.preventDefault();
    setShowDeletePost(false);
  }

  
  function deletePost() {
    console.log("props.id in deletePost", props.id)
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

    return(
        <>
        <button
        onClick={() => {
        setShowDeletePost(true);
        }}
        style={{ display: showDeletePost ? "none" : "inline-block" }}
        >Delete a Post</button>
      <form class="deleteform" onSubmit={handleFormSubmit}  style={{ display: showDeletePost ? "inline-block" : "none" }}>
        <h4>Delete Post</h4>
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
        </>
    )
}