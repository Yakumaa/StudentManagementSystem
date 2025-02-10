const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const loginRouter = require('express').Router()
const Admin = require('../models/Admin')
const Student = require('../models/Student')

loginRouter.post('/', async (req, res) => {
	const { email, password, userType } = req.body
	const Model = userType === 'admin' ? Admin : Student

	try {
		const user = await Model.findOne({ where: { email } })
		console.log('user', user)
		if (!user) throw new Error('User not found')

		const passwordMatch = await bcrypt.compare(password, user.password)
		if (!passwordMatch) throw new Error('Password is incorrect')

		const token = jwt.sign({ id: user.adminId || user.studentId, email: user.email, userType }, process.env.SECRET, {
			expiresIn: '24h',
		})
		console.log('token', token)
		res.json({ token, user: { id: user.adminId || user.studentId, email: user.email, name: user.name, userType } })
	} catch (error) {
		res.status(401).json({ error: error.message })
	}
})

module.exports = loginRouter
