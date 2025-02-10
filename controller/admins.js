const Admin = require('../models/Admin')
const adminRouter = require('express').Router()
const bcrypt = require('bcrypt')

adminRouter.get('/', async (req, res) => {
	try {
		const admins = await Admin.findAll({})
		res.json(admins)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

adminRouter.get('/:id', async (req, res) => {
	try {
		const admin = await Admin.findByPk(req.params.id)
		if (admin) {
			res.json(admin)
		} else {
			res.status(404).end()
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

adminRouter.post('/', async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		const admin = await Admin.create({ ...req.body, password: hashedPassword })
		res.status(201).json(admin)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

module.exports = adminRouter
