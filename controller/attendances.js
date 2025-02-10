const AttendanceRecord = require('../models/AttendanceRecord')
const attendanceRouter = require('express').Router()

attendanceRouter.get('/', async (req, res) => {
	try {
		const attendances = await AttendanceRecord.findAll({})
		res.json(attendances)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

attendanceRouter.get('/:id', async (req, res) => {
	try {
		const attendance = await AttendanceRecord.findByPk(req.params.id)
		if (attendance) {
			res.json(attendance)
		} else {
			res.status(404).end()
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

attendanceRouter.post('/', async (req, res) => {
	try {
		const attendance = await AttendanceRecord.create(req.body)
		res.status(201).json(attendance)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

module.exports = attendanceRouter
