import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Posts from './Components/Posts/Posts';
import Post from './Components/Posts/Post';
import {useState, useEffect } from "react"





function App() {
  const [posts, setPosts] = useState([])
  const [author, setAuthor] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  return (
    <div className="App">
      <Routes>
       
       
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/posts' element={<Posts />}></Route>
        <Route path='/post/:id' element={<Post />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
      <Posts 
    posts={posts}
    setPosts={setPosts}
    author={author}
    setAuthor={setAuthor}
    title={title}
    setTitle={setTitle}
    content={content}
    setContent={setContent}
 
  />
    </div>
  );
}

export default App;
