const Form = require('../models/Form')
const formRouter = require('express').Router()

formRouter.get('/', async (req, res) => {
	try {
		const forms = await Form.findAll({})
		res.json(forms)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

formRouter.post('/', async (req, res) => {
	try {
		const { templateId, submittedBy } = req.body

		// Ensure that required fields are provided
		if (!templateId || !submittedBy) {
			return res.status(400).json({ error: 'Missing required fields' })
		}

		// Insert form data
		await Form.create({
			templateId,
			submittedBy,
		})

		res.status(201).json({ message: 'Form submitted successfully' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

module.exports = formRouter
