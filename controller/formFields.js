const FormField = require('../models/FormField')
const FormFieldHistory = require('../models/FormFieldHistory')
const sequelize = require('../utils/config')
const formFieldRouter = require('express').Router()

function formatLocalDate(date) {
	const pad = (n) => n.toString().padStart(2, '0')
	const year = date.getFullYear()
	const month = pad(date.getMonth() + 1)
	const day = pad(date.getDate())
	const hours = pad(date.getHours())
	const minutes = pad(date.getMinutes())
	const seconds = pad(date.getSeconds())
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

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
		console.log(req.body)
		const field = await FormField.create(req.body)
		console.log(field)
		res.status(201).json(field)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

// formFieldRouter.post('/', async (req, res) => {
// 	let t
// 	try {
// 		// Start transaction
// 		t = await sequelize.transaction()

// 		// Create the form field
// 		const field = await FormField.create(req.body, { transaction: t })

// 		// Create the history record
// 		await FormFieldHistory.create(
// 			{
// 				fieldId: field.fieldId,
// 				templateId: field.templateId,
// 				fieldName: field.fieldName,
// 				fieldType: field.fieldType,
// 				isRequired: field.isRequired,
// 				defaultValue: field.defaultValue,
// 				validationRules: field.validationRules,
// 				displayOrder: field.displayOrder,
// 				createdAt: sequelize.literal(`CONVERT(DATETIME, '${formatLocalDate(new Date(field.createdAt))}', 120)`),
// 				changeType: 'INSERT',
// 			},
// 			{ transaction: t }
// 		)

// 		// Commit transaction
// 		await t.commit()

// 		res.status(201).json(field)
// 	} catch (error) {
// 		// Rollback transaction if error occurs
// 		if (t && !t.finished) {
// 			await t.rollback()
// 		}
// 		console.error('Error creating form field:', error)
// 		res.status(400).json({ error: error.message })
// 	}
// })

module.exports = formFieldRouter
