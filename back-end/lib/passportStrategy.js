//Require Mongoose Models for Post and User
const Post = require('../models/post')
const User = require('../models/user')

// Passport Strategy Package
const passportJWT = require('passport-jwt')

// Passport Options
const jwtOptions = require('./passportOptions')

//JSON Web Token Strategy object that we will be using
const JwtStrategy = passportJWT.Strategy

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
    console.log('Payload Received!')
    console.log('User ID', jwtPayload.id)
    console.log('Token Expires On: ', jwtPayload.exp)

    const user = User.findById(jwtPayload._id)
    .then(user => next(null, user))
    .catch(() => next(null, false))

    if (user._id === jwtPayload._id) {
        //If ID is in the db, then run the route requested by user
        next(null, user)

    } else {
        //If ID does not match -> skip route + return 401
        next(null, false)
    }
})





module.exports = strategy