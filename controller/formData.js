const FormData = require('../models/FormData')
const FormField = require('../models/FormField')
const FormTemplate = require('../models/FormTemplate')
const defineAssociations = require('../models/associations')
const formDataRouter = require('express').Router()

defineAssociations()

formDataRouter.get('/', async (req, res) => {
	try {
		const formData = await FormData.findAll({})
		res.json(formData)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

formDataRouter.get('/student/:studentId', async (req, res) => {
	try {
		const formData = await FormData.findAll({
			where: {
				studentId: req.params.studentId,
			},
			include: [
				{
					model: FormField,
					as: 'field',
					attributes: ['fieldName', 'fieldType'],
				},
				{
					model: FormTemplate,
					as: 'template',
					attributes: ['templateName'],
				},
			],
		})

		// Restructure the data for easier frontend consumption
		const structured = formData.reduce((acc, data) => {
			const templateId = data.templateId
			if (!acc[templateId]) {
				acc[templateId] = {
					templateName: data.template.templateName,
					fields: {},
				}
			}
			acc[templateId].fields[data.field.fieldName] = data.fieldValue
			return acc
		}, {})

		res.json(structured)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

formDataRouter.post('/submit', async (req, res) => {
	try {
		const { studentId, templateId, formData } = req.body

		// Get all fields for the template
		const fields = await FormField.findAll({
			where: { templateId },
		})

		// Create form data entries
		const entries = fields.map((field) => ({
			studentId,
			templateId,
			fieldId: field.fieldId,
			fieldValue: formData[field.fieldName] || null,
		}))

		await FormData.bulkCreate(entries)

		res.status(201).json({ message: 'Form data submitted successfully' })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

module.exports = formDataRouter
