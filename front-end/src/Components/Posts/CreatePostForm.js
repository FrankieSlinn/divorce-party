import Posts from "./Posts"
import { useState, useEffect } from "react";
export default function CreatePostForm(props){
    const [showCreatePost, setShowCreatePost] = useState(false)
    //Create a Post
  const postAPI= function(props){

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
  
  
  
    function createPost(e) {
      if (props.author !== "" && props.content !== "") {
        postAPI();
        // setShowCreatePost(false)
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
  
    return(
        <>
         <button  
        onClick={()=>{setShowCreatePost(true)}}
         >Add a Post</button> 

        <form class="postform" 
      
            style={{display: showCreatePost? "inline-block" : "none"}}
              >
        
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
        </>
    )



}