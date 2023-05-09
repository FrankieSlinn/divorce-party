// Passport Strategy Package
const passportJWT = require('passport-jwt')

// Passport Options
const jwtOptions = require('./passportOptions')

//JSON Web Token Strategy object that we will be using
const JwtStrategy = passportJWT.Strategy

// module.exports = strategy