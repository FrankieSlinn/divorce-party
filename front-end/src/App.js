import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Posts from './Components/Posts/Posts';
import Post from './Components/Posts/Post';
import NavBar from './Components/NavBar/NavBar';
import Users from './Components/Users/Users';
import { getAllUsers } from './Components/Users/api';
import ShowUser from './Components/Users/ShowUser';
import NewUserForm from './Components/Users/NewUserForm';


function App() {
  const [users, setUsers] = useState([])

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

        <Route path='/posts' element={<Posts />}></Route>
        <Route path='/post/:id' element={<Post />}></Route>

        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
