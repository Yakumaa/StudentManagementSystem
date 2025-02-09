const Student = require('../models/Student')
const Department = require('../models/Department')
const studentRouter = require('express').Router()

studentRouter.get('/', async (req, res) => {
	try {
		const students = await Student.findAll({})
		res.json(students)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

studentRouter.get('/:id', async (req, res) => {
	try {
		const student = await Student.findByPk(req.params.id)
		if (student) {
			res.json(student)
		} else {
			res.status(404).end()
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

studentRouter.post('/create', async (req, res) => {
	try {
		const department = await Department.findByPk(req.body.departmentId)
		if (!department) {
			return res.status(400).json({ error: 'Invalid departmentId' })
		}

		// Convert the incoming date string to a Date object
		const dateObj = new Date(req.body.dateOfBirth)
		// Format to YYYY-MM-DD (e.g., "2024-11-02")
		req.body.dateOfBirth = dateObj.toISOString().slice(0, 10)
		console.log(typeof req.body.dateOfBirth)
		const student = await Student.create(req.body)
		res.status(201).json(student)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

module.exports = studentRouter
