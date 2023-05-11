import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createNewUserPost, deleteOneUserPost, getOneUser, getToDeleteAccountPage, getToUpdateAccountPage, getToUpdatePasswordPage } from './api'


export default function UserAccount() {
    const navigate = useNavigate();
    const params = useParams()
    const [user, setUser] = useState({})
    const [showForm, setShowForm] = useState(false)
    



    useEffect(() => {
        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            setUser(data)
        })
    }, [params.id])

    async function handleDeleteAccount() {
        
        let token = JSON.parse(localStorage.getItem('divorceJWT'))       
        let response = await getToDeleteAccountPage(params.id, token)
        console.log(response)
     
        if (response.status === 401) {
            navigate('/users/login')
        }
        if (response.status === 200) {
            navigate(`/users/${params.id}/account/delete`)
        }
    }

    async function handleUpdateAccount() {
        let token = JSON.parse(localStorage.getItem('divorceJWT'))       
        let response = await getToUpdateAccountPage(params.id, token)
        if (response.status === 401) {
            navigate('/users/login')
        }
        if (response.status === 200) {
            navigate(`/users/${params.id}/account/update`)
        }
    }

    async function handleUpdatePassword() {
        let token = JSON.parse(localStorage.getItem('divorceJWT'))       
        let response = await getToUpdatePasswordPage(params.id, token)
   
        if (response.status === 401) {
            navigate('/users/login')
        }
        if (response.status === 200) {
            navigate(`/users/${params.id}/account/update/password`)
        } 
    }

    const template = {
        title: '',
        content: '',
    }
    const [formData, setFormData] = useState(template)


    function handleFormChange(e) {
        const newInput = {...formData, [e.target.name]: e.target.value}
        console.log(newInput)
        setFormData(newInput)
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        formData.author = user.name
        console.log(formData)
        await createNewUserPost(params.id, formData)

        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            setUser(data)
        
        })
        setFormData({title: '',
        content: ''})
        setShowForm(false)

    }

    async function handleDeletePost (e, postId) {
        
        await deleteOneUserPost(params.id, postId)
      
        
        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            setUser(data)
        
        })
    }
  
   



    let display;
   
    if (user.posts) {
      display = user.posts.map((post) => {
        return <div>
                    <Link to={`/users/${user._id}/posts/${post._id}`} className='flex flex-col py-5 px-10 text-center items-center' key={post._id}>
                        <h2 className='block font-bold text-lg'>{post.title}</h2>
                        <p className='text-justify'>{post.content}</p>
                        <p>Entry ID: {post._id}</p>
                    </Link>
                        <button onClick={(e) => (handleDeletePost(e, post._id))}>Delete Post</button>
                        <button>Update Post</button>
                </div>
    })

    } else {
      display = <p>Loading...</p>
    }
    

  return (
    <div className='flex flex-col px-10 pb-5 pt-4 h-100'>
        <h2 className='text-2xl font-bold'>{user.name}</h2>
        <h2 className='text-xl pb-5'>{user.username}</h2>
        <button className='pb-5' onClick={handleDeleteAccount}>delete account</button>
        <button className='pb-5' onClick={handleUpdateAccount}>update username / display name</button>
        <button className='pb-5' onClick={handleUpdatePassword}>update password</button>
        {!showForm && <button className='pb-5' onClick={() => (setShowForm(!showForm))}>Add new post</button>}
        {showForm && <div className='mb-10 mt-5'>
                   {    <form onSubmit={handleFormSubmit} className='flex flex-col gap-5'>
                        <ul>
                            <li><label>Title:
                                <input name="title" onChange={handleFormChange}></input>
                            </label></li>
                            
                       
                            <li><label>Content:
                                <textarea
                                name="content"
                                onChange={handleFormChange}
                                required
                                ></textarea>
                            </label></li>
                     
                            <li className='py-2'> <button type="button" onClick={() => (setShowForm(!showForm))}>Cancel</button></li>
                            <li className='py-2'><button type="submit">Submit New Post</button></li>
                            </ul>
                        </form>}
                    </div>}
        <div>
            <Link to={`/users/${params.id}/posts`} className='text-2xl font-bold'>Posts:</Link>
            {display}
        </div>
        
    </div>
  )
}
