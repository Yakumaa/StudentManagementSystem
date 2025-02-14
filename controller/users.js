const User = require('../models/User')
const userRouter = require('express').Router()

userRouter.get('/', async (req, res) => {
	try {
		const users = await User.findAll({})
		res.json(users)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

userRouter.get('/:id', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id)
		if (user) {
			res.json(user)
		} else {
			res.status(404).end()
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

userRouter.post('/', async (req, res) => {
	try {
		const user = await User.create(req.body)
		res.status(201).json(user)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

//TODO: add loogin here?

module.exports = userRouter
