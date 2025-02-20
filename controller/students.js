const Student = require('../models/Student')
const Department = require('../models/Department')
const studentRouter = require('express').Router()
const bcrypt = require('bcrypt')

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

studentRouter.post('/', async (req, res) => {
	try {
		// const department = await Department.findByPk(req.body.departmentId)
		// if (!department) {
		// 	return res.status(400).json({ error: 'Invalid departmentId' })
		// }
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		const student = await Student.create({ ...req.body, password: hashedPassword })
		res.status(201).json(student)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

module.exports = studentRouter
