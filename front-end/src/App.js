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
const [darkMode, setDarkMode] = useState(true)

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

  function handleDarkMode() {
    setDarkMode(!darkMode)
  }
  
  return (
  <div className={darkMode ? "dark" : ""}>
    <div className=' w-screen h-screen text-black dark:bg-gray-900 dark:text-white'>
      <NavBar/>
     
      <Routes>
        <Route path='/' element={<Homepage />}></Route>

        <Route path='/users' element={<Users users={users} setUsers={setUsers} className={darkMode ? "dark" : ""}/>}></Route>
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
  <div className='pl-5'>
    <svg onClick={handleDarkMode} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  </div>


    </div>
  </div>
  );
}


export default App
