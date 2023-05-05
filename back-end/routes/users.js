//Require necessary NPM packages
const express = require('express')

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
    User.find()
    .then((allUsers) => {
        res.json({users: allUsers})
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

router.post('/users', (req, res) => {
    User.create(req.body).then(function(newUser) {
        res.status(201).json({user: newUser})
    })

    .catch((error) => {
        res.status(500).json({error: error})
    })
})

/**
 * Action:      SHOW
 * Method:      GET
 * URI:         /users/644ef2f60bf76b599d86f44d
 * Description: Get a User by User ID
 */

router.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if (user) {
            res.json({user: user})
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




module.exports = router
