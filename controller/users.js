const User = require('../models/User')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

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
	console.log(req.body)
	try {
		const hashedPassword = await bcrypt.hash(req.body.passwordHash, 10)
		const user = await User.create({ ...req.body, passwordHash: hashedPassword })
		res.status(201).json(user)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

// userRouter.put('/:id', async (req, res) => {
//   try {
//     const updatedUser = await User.update(req.body, {
//       where: { userId: req.params.id },
//       returning: true,
//     })
//     res.json(updatedUser[1][0])
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// })

//TODO: add isActive column in user table
userRouter.delete('/:id', async (req, res) => {
	try {
		await User.destroy({
			where: { userId: req.params.id },
		})
		res.status(204).end()
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

module.exports = userRouter
