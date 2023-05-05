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
    //Return all Articles as an array
    .then((allUsers) => {
        res.json({users: allUsers})
    })
    //Catch any errors that might occur
    .catch(error => {
        res.status(500).json({error: error})
    })
})

/**
 * Action:      CREATE
 * Method:      POST
 * URI:         /users
 * Description: Create a new Article
 */

router.post('/users', (req, res) => {
    User.create(req.body).then(function(newUser) {
        res.status(201).json({user: newUser})
    })

    .catch((error) => {
        res.status(500).json({error: error})
    })
})



module.exports = router
