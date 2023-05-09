//Require necessary NPM packages
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//Instantiate a Router
const router = express.Router()

//Require Mongoose Models for Post and User
const Post = require('../models/post')
const User = require('../models/user')

/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /users
 * Description: Get All Users
 */


router.get('/users', (req, res) => {
    User.find().populate('posts')
    .then((allUsers) => {
        res.json(allUsers)
    })
    .catch(error => {
        res.status(500).json({error: error})
    })
})

/**
 * Action:      CREATE
 * Method:      POST
 * URI:         /users
 * Description: Create a new User
 */


// router.post('/users', async (req, res) => {

//     const usernameExists = await User.find({username: req.body.username})
//     console.log(usernameExists.length)
   
//     if (usernameExists.length > 0) {
//         res.send({error: "username already exists"})
//     } else {

//         User.create(req.body).then(function(newUser) {
//             res.status(201).json(newUser)
//         })
    
//         .catch((error) => {
//             res.status(500).json({error: error})
//         })

//     }

   
// })


// Hash 
router.post('/users', async (req, res) => {

    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = {
            username: req.body.username,
            password: hashedPassword,
            name: req.body.name,
            posts: []
        }

        User.create(newUser).then(function(user) {
            res.status(201).json(user)
        })


    } catch {
        res.status(500).json({error: 'Internal Server Error'})    }    


})







/**
 * Action:      SHOW
 * Method:      GET
 * URI:         /users/644ef2f60bf76b599d86f44d
 * Description: Get a User by User ID
 */

router.get('/users/:id', (req, res) => {
    User.findById(req.params.id).populate('posts')
    .then(user => {
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFound',
                    message: "The provided ID doesn't match any documents"
                }
            })

        }
        
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({error: error})
    })
})

/**
 * Action:      UPDATE
 * Method:      PUT/PATCH
 * URI:         /users/644ef2f60bf76b599d86f44d
 * Description: Update a User by User ID
 */

router.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('posts')
    .then(user => {
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFound',
                    message: "The provided ID doesn't match any documents"
                }
            })

        }
        
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({error: error})
    })
})


/**
 * Action:      DESTROY
 * Method:      DELETE
 * URI:         /users/644ef2f60bf76b599d86f44d
 * Description: Delete a User by User ID
 */

router.delete('/users/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if (user) {
            res.json(user)
        } else {            
            res.status(404).json({
                error: {
                    name: 'DocumentNotFound',
                    message: "The provided ID doesn't match any documents"
                }
            })

        }
        
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({error: error})
    })
})

/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /users/644ef2f60bf76b599d86f44d/posts
 * Description: Get all posts from a User by User ID
 */

router.get('/users/:id/posts', async (req, res) => {
    try {
        const data = await User.findById(req.params.id).populate('posts')
        res.json(data.posts)
    } catch {
        res.status(500).json({error: 'Internal Server Error'})
    }
})

/**
 * Action:      CREATE
 * Method:      POST
 * URI:         /users/644ef2f60bf76b599d86f44d/posts
 * Description: Create a new post for a User
 */

router.post('/users/:id/posts', async (req, res) => {
    try {
        console.log(req.body)
        const newPost = await Post.create(req.body)
        const data = await User.findByIdAndUpdate(req.params.id, {$push: {posts: newPost}}, {new: true}).populate('posts')
        res.json(data)
    } catch {
        res.status(500).json({error: 'Internal Server Error'})
    }
    
})

/**
 * Action:      SHOW
 * Method:      GET
 * URI:         /users/644ef2f60bf76b599d86f44d/posts/64552ba83b906c65ed9db73b
 * Description: Get a single Post (by post ID) from a User (by User ID)
 */

router.get('/users/:id/posts/:postId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('posts')
        const data = user.posts.find((post) => (post._id == req.params.postId))
        res.json(data)
    } catch {
        res.status(500).json({error: 'Internal Server Error'})
    }
})

/**
 * Action:      UPDATE
 * Method:      PUT
 * URI:         /users/644ef2f60bf76b599d86f44d/posts/64552ba83b906c65ed9db73b
 * Description: Update a single Post (by Post ID) from a User (by User ID)
 */

router.put('/users/:id/posts/:postId', async (req, res) => {
    try {
        const data = await Post.findByIdAndUpdate(req.params.postId, {...req.body}, {new: true})
        res.json(data)

    } catch {
        res.status(500).json({error: 'Internal Server Error'})
    }
})

/**
 * Action:      DESTROY
 * Method:      DELETE
 * URI:         /users/644ef2f60bf76b599d86f44d/posts/64552ba83b906c65ed9db73b
 * Description: Delete a single Post (by Post ID) from a User (by User ID)
 */

router.delete('/users/:id/posts/:postId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('posts')
        const updatedPostsArr = user.posts.filter((post) => (post._id != req.params.postId))
        const data = await User.findByIdAndUpdate(req.params.id, {posts: updatedPostsArr}, {new: true}).populate('posts')
        res.json(data)

    } catch {
        res.status(500).json({error: 'Internal Server Error'})
    }
})

/**
 * Method:      POST
 * URI:         /users/login
 * Description: Login User and find user data in db
 */

router.post('/users/login', async (req, res) => {



//     const user = User.find({username: req.body.username}).then(function(user) {
//         res.status(201).json(user)
//     })
//     .catch((error) => {
//         res.status(500).json({error: error})
//     })



    const user = await User.find({username: req.body.username})
    console.log(user.length == 0)
    
    if (user.length == 0) {
        res.send({error: 'user does not exist in database'})
    } else {

        try {

            if (await bcrypt.compare(req.body.password, user[0].password)) {
                res.status(201).json(user)
              } else {
                res.send({error: 'login credentials could not be verified'})
              }
    
        } catch {
            res.status(500).json({error: 'login failed'})
    
        }

    }
     







})



module.exports = router