const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt

const jwtOptions = {}

// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
// jwtOptions.secretOrKey = process.env.SECRET_KEY