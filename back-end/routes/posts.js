const express = require('express')
const Post = require('../models/post')
const User = require('../models/user')


const app = express()



const router = express.Router()



// Index
router.get('/logs', (req, res) => {
	Log.find()
		.then((allLogs) => {
			res.json({logs: allLogs})
		})
		.catch((error) => {
			console.log(error)
			res.status(500).send('Internal Server Error')
		})
})



router.post('/posts', (req, res) => {
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
router.get('/logs/:id', (req, res) => {
	Log.findById(req.params.id)
		.then((newLog) => res.json(newLog))
		.catch((error) => {
			console.log(error)
			res.status(500).send('Internal Server Error')
		})
})

// // Update
router.put('/logs/:id', (req, res) => {
	Log.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((updatedLog) => res.json(updatedLog))
		.catch((error) => {    
			console.log(error)
			res.status(500).send('Internal Server Error')
		})
})
router.put('/logs/:id/comments', (req, res) => {
	//console.log("comment", comment)
	Log.findByIdAndUpdate(req.params.id,
	{$push:{logComments: {author:req.body.author, comment: req.body.comment}}},{upsert:true})
	.then(function(updatedLog){ res.json(updatedLog)
	})
		.catch((error) => {
			console.log(error)
			res.status(500).send('Internal Server Error')
		})
})


// Destroy
router.delete('/logs/:id', (req, res) => {
	Log.findByIdAndRemove(req.params.id)
		.then((deletedLog) => res.json(deletedLog))
		.catch((error) => {
			console.log(error)
			res.status(500).send('Internal Server Error')
		})
})

module.exports = router
