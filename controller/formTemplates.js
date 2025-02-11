const FormTemplate = require('../models/FormTemplate')
const FormField = require('../models/FormField')
const formTemplateRouter = require('express').Router()

formTemplateRouter.get('/', async (req, res) => {
	try {
		const templates = await FormTemplate.findAll({})
		res.json(templates)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

formTemplateRouter.get('/:id', async (req, res) => {
	try {
		const template = await FormTemplate.findByPk(req.params.id, {})
		if (template) {
			res.json(template)
		} else {
			res.status(404).end()
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

formTemplateRouter.post('/', async (req, res) => {
	try {
		const { fields, ...templateData } = req.body
		const template = await FormTemplate.create(templateData)

		if (fields && fields.length > 0) {
			const formFields = fields.map((field) => ({
				...field,
				templateId: template.templateId,
			}))
			await FormField.bulkCreate(formFields)
		}

		const createdTemplate = await FormTemplate.findByPk(template.templateId, {
			include: [
				{
					model: FormField,
					as: 'fields',
				},
			],
		})

		res.status(201).json(createdTemplate)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

module.exports = formTemplateRouter
