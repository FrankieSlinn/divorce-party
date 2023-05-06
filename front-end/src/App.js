import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import NavBar from './Components/NavBar/NavBar';
import Users from './Components/Users/Users';
import { getAllUsers } from './Components/Users/api';
import ShowUser from './Components/Users/ShowUser';
import NewUserForm from './Components/Users/NewUserForm';
import Posts from './Components/Posts/Posts'


function App() {
const [users, setUsers] = useState([])
const [posts, setPosts] = useState([])
const [author, setAuthor]=useState("")
const [title, setTitle]=useState("")
const [id, setId]=useState("")
const [content, setContent]=useState("")


  useEffect(() => {
      getAllUsers()
      .then(results => results.json())
      .then(data => {
          console.log(data)
          setUsers(data)})
      
  }, [])
  
  return (
    <div className="App">
      <NavBar />
     
      <Routes>
        <Route path='/' element={<Homepage />}></Route>

        <Route path='/users' element={<Users users={users} setUsers={setUsers}/>}></Route>
        <Route path='/users/:id' element={<ShowUser setUsers={setUsers}/>}></Route>
        <Route path='/users/create' element={<NewUserForm setUsers={setUsers}/>}></Route>

        <Route path='/posts' element={<h1>Coming soon...</h1>}></Route>
        <Route path='/post/:id' element={<h1>Coming soon...</h1>}></Route>

        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
      <Posts 
    posts={posts}
    setPosts={setPosts}
    author={author}
    setAuthor={setAuthor}
    title={title}
    setTitle={setTitle}
    id={id}
    setId={setId}
    content={content}
    setContent={setContent}
 
  />
    </div>
  );
}


export default App
