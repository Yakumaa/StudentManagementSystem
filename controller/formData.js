const FormData = require('../models/FormData')
const Form = require('../models/Form')
const FormFile = require('../models/FormFile')
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

// formDataRouter.post('/', tokenExtractor, userExtractor, async (req, res) => {
// 	console.log('user', req.user.id)
// 	const loggedInUserId = req.user.id
// 	const t = await sequelize.transaction()
// 	try {
// 		const form = await Form.create(
// 			{
// 				templateId: req.body.templateId,
// 				submittedBy: loggedInUserId,
// 				submittedAt: new Date(),
// 			},
// 			{ transaction: t }
// 		)

// 		const formId = form.dataValues.formId
// 		console.log('Generated FormID:', formId)

// 		// Handle file uploads if present
// 		let profilePictureName = null
// 		let academicDocsName = null

// 		// Process the profile picture if provided
// 		console.log('profilePicture', req.body.profilePicture)
// 		if (req.body.profilePicture && Object.keys(req.body.profilePicture).length > 0) {
// 			const profilePictureRecord = await FormFile.create(
// 				{
// 					formId: formId,
// 					fileName: req.body.profilePicture.name,
// 					fileData: Buffer.from(req.body.profilePicture.data, 'base64'),
// 					fileType: req.body.profilePicture.type,
// 					fileSize: req.body.profilePicture.size,
// 				},
// 				{ transaction: t }
// 			)
// 			// Save only the file name in the formData record
// 			profilePictureName = profilePictureRecord.fileName
// 		}

// 		// Process the academic documents if provided
// 		if (req.body.academicDocs && Object.keys(req.body.academicDocs).length > 0) {
// 			const academicDocsRecord = await FormFile.create(
// 				{
// 					formId: formId,
// 					fileName: req.body.academicDocs.name,
// 					fileData: Buffer.from(req.body.academicDocs.data, 'base64'),
// 					fileType: req.body.academicDocs.type,
// 					fileSize: req.body.academicDocs.size,
// 				},
// 				{ transaction: t }
// 			)
// 			// Save only the file name in the formData record
// 			academicDocsName = academicDocsRecord.fileName
// 		}

// 		await FormData.create(
// 			{
// 				templateId: req.body.templateId,
// 				formId: formId,
// 				fieldValue1: req.body.registrationNumber,
// 				fieldValue2: req.body.firstName,
// 				fieldValue3: req.body.lastName,
// 				fieldValue4: req.body.fathersName,
// 				fieldValue5: req.body.email,
// 				fieldValue6: req.body.gender,
// 				fieldValue7: req.body.dateOfBirth,
// 				fieldValue8: req.body.address,
// 				fieldValue9: req.body.phoneNumber,
// 				fieldValue10: req.body.departmentId,
// 				fieldValue11: req.body.batchYear,
// 				fieldValue12: req.body.currentSemester,
// 				fieldValue13: req.body.shift,
// 				fieldValue14: profilePictureName || null,
// 				fieldValue15: req.body.attendance,
// 				fieldValue16: academicDocsName || null,
// 			},
// 			{ transaction: t }
// 		)

// 		// Try to commit the transaction
// 		try {
// 			await t.commit()
// 			res.status(201).json({
// 				message: 'Form submitted successfully',
// 				formId: formId,
// 				profilePictureName,
// 				academicDocsName,
// 			})
// 		} catch (commitError) {
// 			console.error('Commit error:', commitError)
// 			// If commit fails, try rolling back
// 			if (!t.finished) await t.rollback()
// 			return res.status(500).json({ error: commitError.message })
// 		}

// 		res.status(201).json({ message: 'Form submitted successfully' })
// 	} catch (error) {
// 		// Only attempt rollback if transaction hasn't already been finished
// 		if (!t.finished) {
// 			try {
// 				await t.rollback()
// 			} catch (rollbackError) {
// 				console.error('Rollback error:', rollbackError)
// 			}
// 		}
// 		res.status(500).json({ error: error.message })
// 	}
// })

formDataRouter.post('/', tokenExtractor, userExtractor, async (req, res) => {
	console.log('user', req.user.id)
	const loggedInUserId = req.user.id
	const t = await sequelize.transaction()
	try {
		// Create a Form record
		const form = await Form.create(
			{
				templateId: req.body.templateId,
				submittedBy: loggedInUserId,
				submittedAt: new Date(),
			},
			{ transaction: t }
		)

		// Retrieve the generated FormID (using the correct attribute name from your model)
		const formId = form.dataValues.formId
		console.log('Generated FormID:', formId)

		// Variables to store the file names (only)
		let profilePictureName = null
		let academicDocsName = null

		// Process the profile picture if provided (check if it's non-empty)
		console.log('profilePicture', req.body.profilePicture)
		if (req.body.profilePicture && Object.keys(req.body.profilePicture).length > 0) {
			const profilePictureRecord = await FormFile.create(
				{
					formId: formId,
					fileName: req.body.profilePicture.name,
					fileData: Buffer.from(req.body.profilePicture.data, 'base64'),
					fileType: req.body.profilePicture.type,
					fileSize: req.body.profilePicture.size,
				},
				{ transaction: t }
			)
			// Save only the file name
			profilePictureName = profilePictureRecord.fileName
		}

		// Process academic documents if provided
		console.log('academicDocs payload:', JSON.stringify(req.body.academicDocs))
		if (req.body.academicDocs && Object.keys(req.body.academicDocs).length > 0) {
			const academicDocsRecord = await FormFile.create(
				{
					formId: formId,
					fileName: req.body.academicDocs.name,
					fileData: Buffer.from(req.body.academicDocs.data, 'base64'),
					fileType: req.body.academicDocs.type,
					fileSize: req.body.academicDocs.size,
				},
				{ transaction: t }
			)
			// Save only the file name
			academicDocsName = academicDocsRecord.fileName
		}

		// Create the FormData record (store only file names for fields 14 and 16)
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
				fieldValue14: profilePictureName || null,
				fieldValue15: req.body.attendance,
				fieldValue16: academicDocsName || null,
			},
			{ transaction: t }
		)

		await t.commit()
		// Send one response after successful commit
		res.status(201).json({
			message: 'Form submitted successfully',
			formId: formId,
			profilePictureName,
			academicDocsName,
		})
	} catch (error) {
		if (!t.finished) {
			try {
				await t.rollback()
			} catch (rollbackError) {
				console.error('Rollback error:', rollbackError)
			}
		}
		console.error('Error in form submission:', error)
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
