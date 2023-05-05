const express = require('express')
const Post = require('../models/post')
const User = require('../models/user')


const app = express()


const router = express.Router()




// Index
router.get('/posts', (req, res) => {
	Post.find()
		.then((allPosts) => {
			res.json({posts: allPosts})
		})
		.catch((error) => {
			console.log(error)
			res.status(500).send('Internal Server Error')
		})
})

// console.log("Post", Post)

// //Test
// router.get('/posts', (req, res) => {
// 	res.send("hi hi hi")})

router.post('/posts', (req, res) => {
	console.log("req.body",req.body)
	Post.create(req.body)
		.then(function(post){
			res.json(post); 		
		})
		.catch((error) => {
			console.log(error)
			res.status(500).send('Internal Server Error')
		})
})

// Show
router.get('/posts/:id', (req, res) => {
	Post.findById(req.params.id)
		.then((newPost) => res.json(newPost))
		.catch((error) => {
			console.log(error)
			res.status(500).send('Internal Server Error')
		})
})

// // // Update
router.put('/posts/:id', (req, res) => {
	Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((updatedPost) => res.json(updatedPost))
		.catch((error) => {    
			console.log(error)
			res.status(500).send('Internal Server Error')
		})
})

// // Destroy
router.delete('/posts/:id', (req, res) => {
	Post.findByIdAndRemove(req.params.id)
		.then((deletedPost) => res.json(deletedPost))
		.catch((error) => {
			console.log(error)
			res.status(500).send('Internal Server Error')
		})
})
// router.put('/logs/:id/comments', (req, res) => {
// 	//console.log("comment", comment)
// 	Log.findByIdAndUpdate(req.params.id,
// 	{$push:{logComments: {author:req.body.author, comment: req.body.comment}}},{upsert:true})
// 	.then(function(updatedLog){ res.json(updatedLog)
// 	})
// 		.catch((error) => {
// 			console.log(error)
// 			res.status(500).send('Internal Server Error')
// 		})
// })




module.exports = router
