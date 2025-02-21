const FormDataHistory = require('../models/FormDataHistory')
const sequelize = require('../utils/config')
const defineAssociations = require('../models/associations')
const formDataHistoryRouter = require('express').Router()
const { tokenExtractor, userExtractor } = require('../utils/middleware')

// defineAssociations()

formDataHistoryRouter.get('/', async (req, res) => {
	try {
		const formDataHistory = await FormDataHistory.findAll()
		res.json(formDataHistory)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

formDataHistoryRouter.put('/:id', async (req, res) => {
	const { id } = req.params
	const formDataHistory = req.body
	try {
		const updatedFormDataHistory = await FormDataHistory.update(formDataHistory, {
			where: { historyId: id },
		})
		res.json(updatedFormDataHistory)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

module.exports = formDataHistoryRouter
