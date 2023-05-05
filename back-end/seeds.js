const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");

const mongoURI = "mongodb://localhost:27017/posts";

mongoose.connect(mongoURI)
 .then(() => console.log("MongoDB Connected..."))

// Creating Four Users
const hari = new User({
    username: "hramanathan",
    password: "1111",
    name: "Hari Ramanathan",
    posts: []
})

const ben = new User({
    username: "bkhoury",
    password: "2222",
    name: "Ben Khoury",
    posts: []    
})

const katie = new User({
    username: "kloesch",
    password: "3333",
    name: "Katie Loesch",
    posts: []
})

const fran = new User({
    username: "fkissling",
    password: "4444",
    name: "Franziska Kissling",
    posts: []
})

// Saving Four Users
hari.save()
  .then(() => console.log("user hari saved."))
  .catch(() => console.log("user hari NOT saved."))

ben.save()
  .then(() => console.log("user ben saved."))
  .catch(() => console.log("user ben NOT saved."))

katie.save()
  .then(() => console.log("user katie saved."))
  .catch(() => console.log("user katie NOT saved."))

fran.save()
  .then(() => console.log("user fran saved."))
  .catch(() => console.log("user fran NOT saved."))


// Create Guest Book Posts
const hariFirstPost = new Post({
    author: "Hari Ramanathan",
    title: "Hari's First Post",
    content: "Blah blah blah"
}, { timestamps: Date.now })

const hariSecondPost = new Post({
  author: "Hari Ramanathan",
  title: "Hari's Second Post",
  content: "Yadda yadda yadda"
}, { timestamps: Date.now })

const benFirstPost = new Post({
  author: "Ben Khoury",
  title: "Ben's Post",
  content: "Bhooyakasha. It was the best of times. It was the worst of times."
}, { timestamps: Date.now })

// Push Post into Posts Array
hari.posts.push(hariFirstPost)
hari.posts.push(hariSecondPost)
ben.posts.push(benFirstPost)

// Save Posts Array
hari.save()
 .then(() => console.log('hari post saved!'))
 .catch(() => console.log('hari post NOT saved.'))

module.exports = { User, Post }