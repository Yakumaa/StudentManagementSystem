const FormField = require('../models/FormField')
const formFieldRouter = require('express').Router()

formFieldRouter.get('/', async (req, res) => {
	try {
		const fields = await FormField.findAll({})
		res.json(fields)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

formFieldRouter.get('/template/:templateId', async (req, res) => {
	try {
		const fields = await FormField.findAll({
			where: {
				templateId: req.params.templateId,
			},
			order: [['displayOrder', 'ASC']],
		})
		res.json(fields)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

formFieldRouter.post('/', async (req, res) => {
	try {
		const field = await FormField.create(req.body)
		res.status(201).json(field)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

module.exports = formFieldRouter
