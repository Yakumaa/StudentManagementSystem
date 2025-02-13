const FormData = require('../models/FormData')
const Form = require('../models/Form')
const sequelize = require('../utils/config')
const FormField = require('../models/FormField')
const FormTemplate = require('../models/FormTemplate')
const Student = require('../models/Student')
const defineAssociations = require('../models/associations')
const formDataRouter = require('express').Router()

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

// formDataRouter.post('/', async (req, res) => {
// 	console.log(req.body)
// 	try {
// 		const {
// 			templateId,
// 			registrationNumber,
// 			firstName,
// 			lastName,
// 			fathersName,
// 			email,
// 			gender,
// 			dateOfBirth,
// 			address,
// 			phoneNumber,
// 			departmentId,
// 			batchYear,
// 			currentSemester,
// 			shift,
// 			profilePicture,
// 			attendance,
// 		} = req.body

// 		// Ensure that required fields are provided
// 		if (!templateId || !registrationNumber || !firstName || !lastName) {
// 			return res.status(400).json({ error: 'Missing required fields' })
// 		}

// 		// Insert form data
// 		await FormData.create({
// 			templateId,
// 			fieldValue1: registrationNumber,
// 			fieldValue2: firstName,
// 			fieldValue3: lastName,
// 			fieldValue4: fathersName,
// 			fieldValue5: email,
// 			fieldValue6: gender,
// 			fieldValue7: dateOfBirth,
// 			fieldValue8: address,
// 			fieldValue9: phoneNumber,
// 			fieldValue10: departmentId,
// 			fieldValue11: batchYear,
// 			fieldValue12: currentSemester,
// 			fieldValue13: shift,
// 			fieldValue14: profilePicture || null,
// 			fieldValue15: attendance,
// 		})

// 		res.status(201).json({ message: 'Form data submitted successfully' })
// 	} catch (error) {
// 		res.status(400).json({ error: error.message })
// 	}
// })

formDataRouter.post('/', async (req, res) => {
	const {
		templateId,
		registrationNumber,
		firstName,
		lastName,
		fathersName,
		email,
		gender,
		dateOfBirth,
		address,
		phoneNumber,
		departmentId,
		batchYear,
		currentSemester,
		shift,
		profilePicture,
		attendance,
	} = req.body

	console.log('Received templateId:', templateId)

	// Begin transaction
	const t = await sequelize.transaction()

	try {
		//Insert into Form table to create a form submission record
		const form = await Form.create(
			{
				templateId: templateId,
				submittedBy: 'admin', //TODO: Change this to the logged-in user
				submittedAt: new Date(),
			},
			{ transaction: t }
		)

		// console.log(form)

		// Retrieve the generated FormID
		const formId = form.dataValues.formId
		// console.log('Generated FormID:', formId)

		// Insert into FormData table using the generated FormID
		await FormData.create(
			{
				templateId: templateId,
				formId: formId, // Link to the Form record
				fieldValue1: registrationNumber,
				fieldValue2: firstName,
				fieldValue3: lastName,
				fieldValue4: fathersName,
				fieldValue5: email,
				fieldValue6: gender,
				fieldValue7: dateOfBirth,
				fieldValue8: address,
				fieldValue9: phoneNumber,
				fieldValue10: departmentId,
				fieldValue11: batchYear,
				fieldValue12: currentSemester,
				fieldValue13: shift,
				fieldValue14: profilePicture || null,
				fieldValue15: attendance,
			},
			{ transaction: t }
		)

		// Commit transaction if both inserts succeed
		await t.commit()

		res.status(201).json({ message: 'Form submitted successfully' })
	} catch (error) {
		// Roll back transaction on error
		await t.rollback()
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
