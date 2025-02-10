const Department = require('../models/Department')
const departmentRouter = require('express').Router()

departmentRouter.get('/', async (req, res) => {
	try {
		const departments = await Department.findAll()
		res.json(departments)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

departmentRouter.get('/:id', async (req, res) => {
	try {
		const department = await Department.findByPk(req.params.id)
		if (department) {
			res.json(department)
		} else {
			res.status(404).end()
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

departmentRouter.post('/', async (req, res) => {
	try {
		const department = await Department.create(req.body)
		res.status(201).json(department)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

module.exports = departmentRouter
