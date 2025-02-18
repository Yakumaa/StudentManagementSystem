const FormData = require('../models/FormData')
const Form = require('../models/Form')
const sequelize = require('../utils/config')
const defineAssociations = require('../models/associations')
const formDataRouter = require('express').Router()
const { tokenExtractor, userExtractor } = require('../utils/middleware')

defineAssociations()

formDataRouter.get('/', async (req, res) => {
	try {
		const formData = await FormData.findAll({
			where: { isActive: 1 }, // Only get active records
		})
		res.json(formData)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

formDataRouter.get('/:id', async (req, res) => {
	try {
		const formData = await FormData.findByPk(req.params.id, {})
		if (formData) {
			res.json(formData)
		} else {
			res.status(404).end()
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

formDataRouter.post('/', tokenExtractor, userExtractor, async (req, res) => {
	console.log('user', req.user.id)
	const loggedInUserId = req.user.id
	const t = await sequelize.transaction()
	try {
		const form = await Form.create(
			{
				templateId: req.body.templateId,
				submittedBy: loggedInUserId,
				submittedAt: new Date(),
			},
			{ transaction: t }
		)

		const formId = form.dataValues.formId
		console.log('Generated FormID:', formId)

		await FormData.create(
			{
				templateId: req.body.templateId,
				formId: formId,
				fieldValue1: req.body.registrationNumber,
				fieldValue2: req.body.firstName,
				fieldValue3: req.body.lastName,
				fieldValue4: req.body.fathersName,
				fieldValue5: req.body.email,
				fieldValue6: req.body.gender,
				fieldValue7: req.body.dateOfBirth,
				fieldValue8: req.body.address,
				fieldValue9: req.body.phoneNumber,
				fieldValue10: req.body.departmentId,
				fieldValue11: req.body.batchYear,
				fieldValue12: req.body.currentSemester,
				fieldValue13: req.body.shift,
				fieldValue14: req.body.profilePicture || null,
				fieldValue15: req.body.attendance,
			},
			{ transaction: t }
		)

		// Try to commit the transaction
		try {
			await t.commit()
		} catch (commitError) {
			console.error('Commit error:', commitError)
			// If commit fails, try rolling back
			if (!t.finished) await t.rollback()
			return res.status(500).json({ error: commitError.message })
		}

		res.status(201).json({ message: 'Form submitted successfully' })
	} catch (error) {
		// Only attempt rollback if transaction hasn't already been finished
		if (!t.finished) {
			try {
				await t.rollback()
			} catch (rollbackError) {
				console.error('Rollback error:', rollbackError)
			}
		}
		res.status(500).json({ error: error.message })
	}
})

formDataRouter.put('/:id', async (req, res) => {
	try {
		const dataId = req.params.id
		const updatedData = req.body

		// Map the form fields to the correct fieldValue columns
		const mappedData = {
			fieldValue1: updatedData.registrationNumber,
			fieldValue2: updatedData.firstName,
			fieldValue3: updatedData.lastName,
			fieldValue4: updatedData.fathersName,
			fieldValue5: updatedData.email,
			fieldValue6: updatedData.gender,
			fieldValue7: updatedData.dateOfBirth,
			fieldValue8: updatedData.address,
			fieldValue9: updatedData.phoneNumber,
			fieldValue10: updatedData.departmentId,
			fieldValue11: updatedData.batchYear,
			fieldValue12: updatedData.currentSemester,
			fieldValue13: updatedData.shift,
		}

		await FormData.update(mappedData, {
			where: { dataId: dataId },
		})

		res.json({ message: 'Record updated successfully' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

formDataRouter.delete('/:id', async (req, res) => {
	try {
		const formId = req.params.id
		console.log('deleteid', formId)

		await FormData.update({ isActive: 0 }, { where: { dataId: formId } })

		res.json({ message: 'Record deactivated successfully' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

module.exports = formDataRouter
