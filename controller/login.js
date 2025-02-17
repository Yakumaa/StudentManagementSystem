const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')
const UserType = require('../models/UserType')
// const defineAssociations = require('../models/associations')

// defineAssociations()

loginRouter.post('/', async (req, res) => {
	const { email, password } = req.body
	console.log(email, password)

	try {
		const user = await User.findOne({
			where: { email },
		})

		console.log(user)

		if (!user) {
			throw new Error('Invalid email or password')
		}

		const passwordMatch = await bcrypt.compare(password, user.passwordHash)
		if (!passwordMatch) {
			throw new Error('Invalid password')
		}

		const userType = user.userTypeID
		console.log(userType)

		// Create token with user information
		const token = jwt.sign(
			{
				id: user.userId,
				email: user.email,
				userType,
				username: user.username,
			},
			process.env.SECRET,
			{
				expiresIn: '24h',
			}
		)

		res.json({
			token,
			user: {
				id: user.userId,
				email: user.email,
				username: user.username,
				userType,
			},
		})
	} catch (error) {
		res.status(401).json({
			error: 'Invalid email or password',
		})
	}
})

module.exports = loginRouter
