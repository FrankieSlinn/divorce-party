import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createNewUserPost, deleteOneUserPost, getOneUser, getToDeleteAccountPage, getToUpdateAccountPage, getToUpdatePasswordPage, updateOneUserPost } from './api'

export default function UserAccount() {
    const navigate = useNavigate();
    const params = useParams()

    const [user, setUser] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [updatePost, setUpdatePost] = useState('')

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
        author: ''
    }

    const [formData, setFormData] = useState(template)
    const [updateFormData, setUpdateFormData] = useState({title: '', content: ''})

    function handleFormChange(e) {
        const newInput = {...formData, [e.target.name]: e.target.value}
        setFormData(newInput)
    }

    function handleUpdateFormChange(e) {
        const newInput = {...updateFormData, [e.target.name]: e.target.value}
        setUpdateFormData(newInput)
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        formData.author = user.name
        await createNewUserPost(params.id, formData)

        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            setUser(data)
        
        })
        setFormData({title: '',
        content: '', author: ''})
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

    function handleShowUpdateForm(e, post) {
        setUpdatePost(post)
        setShowUpdateForm(true)
        setUpdateFormData({title: post.title, content: post.content, author: post.author})
    }

    async function handleUpdatePost (e) {
        e.preventDefault()
        const resp = await updateOneUserPost(params.id, updatePost._id, updateFormData)
        getOneUser(params.id)
        .then(results => results.json())
        .then(data => {
            setUser(data)
        
        })
        setUpdateFormData({title: '',
        content: ''})

        setShowUpdateForm(false)
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
                        <button onClick={(e) => (handleShowUpdateForm(e, post))}>Edit Post</button>
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
                    {showUpdateForm && <div className='mb-10 mt-5'>
                        {<form onSubmit={(e) => handleUpdatePost(e)} className='flex flex-col gap-5'>
                        <ul>
                            <li><label>Title:
                                <input
                                    name="title"
                                    onChange={handleUpdateFormChange}
                                    value={updateFormData.title}
                                ></input>
                            </label></li>
                            
                            <li><label>Content:
                                <textarea
                                name="content"
                                onChange={handleUpdateFormChange}
                                value={updateFormData.content}
                                required
                                ></textarea>
                            </label></li>
                     
                            <li className='py-2'> <button type="button" onClick={() => (setShowUpdateForm(false))}>Cancel</button></li>
                            <li className='py-2'><button type="submit">Save Changes</button></li>
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
