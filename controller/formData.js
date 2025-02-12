const FormData = require('../models/FormData')
const FormField = require('../models/FormField')
const FormTemplate = require('../models/FormTemplate')
const Student = require('../models/Student')
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

// formDataRouter.get('/student/:studentId', async (req, res) => {
// 	try {
// 		const formData = await FormData.findAll({
// 			where: {
// 				studentId: req.params.studentId,
// 			},
// 			include: [
// 				{
// 					model: FormField,
// 					as: 'field',
// 					attributes: ['fieldName', 'fieldType'],
// 				},
// 				{
// 					model: FormTemplate,
// 					as: 'template',
// 					attributes: ['templateName'],
// 				},
// 			],
// 		})

// 		// Restructure the data for easier frontend consumption
// 		const structured = formData.reduce((acc, data) => {
// 			const templateId = data.templateId
// 			if (!acc[templateId]) {
// 				acc[templateId] = {
// 					templateName: data.template.templateName,
// 					fields: {},
// 				}
// 			}
// 			acc[templateId].fields[data.field.fieldName] = data.fieldValue
// 			return acc
// 		}, {})

// 		res.json(structured)
// 	} catch (error) {
// 		res.status(500).json({ error: error.message })
// 	}
// })

formDataRouter.post('/submit', async (req, res) => {
	try {
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

		// Ensure that required fields are provided
		if (!templateId || !registrationNumber || !firstName || !lastName) {
			return res.status(400).json({ error: 'Missing required fields' })
		}

		// Insert form data
		await FormData.create({
			templateId,
			fieldValue1: registrationNumber,
			fieldValue2: firstName,
			fieldValue3: lastName,
			fieldValue4: fathersName,
			fieldValue5: email,
			fieldValue6: gender,
			fieldValue7: dateOfBirth, // Ensure correct date format
			fieldValue8: address,
			fieldValue9: phoneNumber,
			fieldValue10: departmentId,
			fieldValue11: batchYear,
			fieldValue12: currentSemester,
			fieldValue13: shift,
			fieldValue14: profilePicture || null,
			fieldValue15: attendance,
		})

		res.status(201).json({ message: 'Form data submitted successfully' })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

formDataRouter.post('/', async (req, res) => {
	try {
		const { studentId, templateId, fieldValues } = req.body

		// Validate that student exists
		const student = await Student.findByPk(studentId)
		if (!student) {
			return res.status(404).json({ error: 'Student not found' })
		}

		// Validate that template exists
		const template = await FormTemplate.findByPk(templateId)
		if (!template) {
			return res.status(404).json({ error: 'Form template not found' })
		}

		// Get the form fields for this template to validate the submission
		const formFields = await FormField.findAll({
			where: { templateId: templateId },
		})

		// Create form data object with dynamic fields
		let formDataObj = {
			studentId,
			templateId,
		}

		// Map the field values to FieldValue1, FieldValue2, etc.
		formFields.forEach((field, index) => {
			const fieldNumber = index + 1
			if (fieldNumber <= 40) {
				// Since we have FieldValue1 to FieldValue40
				const fieldColumnName = `fieldValue${fieldNumber}`
				formDataObj[fieldColumnName] = fieldValues[field.fieldName] || null
			}
		})

		// Create the form data record
		const newFormData = await FormData.create(formDataObj)

		res.status(201).json(newFormData)
	} catch (error) {
		console.error('Error creating form data:', error)
		res.status(500).json({ error: error.message })
	}
})

module.exports = formDataRouter
