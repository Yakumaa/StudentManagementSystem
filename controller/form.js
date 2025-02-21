const Form = require('../models/Form')
const FormHistory = require('../models/FormHistory')
const formRouter = require('express').Router()
const sequelize = require('../utils/config')

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

formRouter.get('/', async (req, res) => {
	try {
		const forms = await Form.findAll({})
		res.json(forms)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

//not being used (kept just incase)
formRouter.post('/', async (req, res) => {
	let t
	try {
		t = await sequelize.transaction()
		const { templateId, submittedBy } = req.body

		if (!templateId || !submittedBy) {
			return res.status(400).json({ error: 'Missing required fields' })
		}

		const newForm = await Form.create(
			{
				templateId,
				submittedBy,
			},
			{ transaction: t }
		)

		console.log('newForm', newForm)

		await FormHistory.create(
			{
				formId: newForm.formId,
				templateId: newForm.templateId,
				submittedBy: newForm.submittedBy,
				submittedAt: sequelize.literal(`CONVERT(DATETIME, '${formatLocalDate(new Date(newForm.submittedAt))}', 120)`),
				changeType: 'INSERT',
			},
			{ transaction: t }
		)

		await t.commit()

		res.status(201).json({
			message: 'Form submitted successfully',
			form: newForm,
		})
	} catch (error) {
		console.error('Transaction error:', error)

		// Rollback transaction if it exists and hasn't completed
		if (t && !t.finished) {
			try {
				await t.rollback()
			} catch (rollbackError) {
				console.error('Rollback error:', rollbackError)
			}
		}

		res.status(500).json({ error: error.message })
	}
})

module.exports = formRouter
