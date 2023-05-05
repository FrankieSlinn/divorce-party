const localDB = 'mongodb://localhost:27017/divorce'

const currentDB = process.env.MONGODB_URI || localDB



//Export the appropriate database based on the current enviroment

module.exports = currentDB