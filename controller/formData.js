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

formDataRouter.get('/:id(\\d+)', async (req, res) => {
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

formDataRouter.get('/users', tokenExtractor, userExtractor, async (req, res) => {
	console.log('user', req.user)
	try {
		const userFormData = await FormData.findAll({
			where: {
				isActive: 1,
			},
			include: [
				{
					model: Form,
					as: 'form',
					where: { submittedBy: req.user.id },
					attributes: [],
				},
			],
		})
		res.json(userFormData)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

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

		// Retrieve the generated FormID
		const formId = form.dataValues.formId
		console.log('Generated FormID:', formId)

		// Variables to store the file names (only)
		let profilePictureName = null
		let academicDocsName = null

		console.log('req.body', req.body)

		// Process the profile picture if provided
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

		// // Create the FormData record
		// await FormData.create(
		// 	{
		// 		templateId: req.body.templateId,
		// 		formId: formId,
		// 		fieldValue1: req.body.registrationNumber,
		// 		fieldValue2: req.body.firstName,
		// 		fieldValue3: req.body.lastName,
		// 		fieldValue4: req.body.fathersName,
		// 		fieldValue5: req.body.email,
		// 		fieldValue6: req.body.gender,
		// 		fieldValue7: req.body.dateOfBirth,
		// 		fieldValue8: req.body.address,
		// 		fieldValue9: req.body.phoneNumber,
		// 		fieldValue10: req.body.departmentId,
		// 		fieldValue11: req.body.batchYear,
		// 		fieldValue12: req.body.currentSemester,
		// 		fieldValue13: req.body.shift,
		// 		fieldValue14: profilePictureName || null,
		// 		fieldValue15: req.body.attendance,
		// 		fieldValue16: academicDocsName || null,
		// 	},
		// 	{ transaction: t }
		// )

		// Create the FormData record
		const formDataRecord = await FormData.create(
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

		// Manually insert into history table
		await sequelize.query(
			`INSERT INTO FormDataHistory
       (DataID, TemplateID, 
        FieldValue1, FieldValue2, FieldValue3, FieldValue4, FieldValue5,
        FieldValue6, FieldValue7, FieldValue8, FieldValue9, FieldValue10,
        FieldValue11, FieldValue12, FieldValue13, FieldValue14, FieldValue15,
        FieldValue16, FieldValue17, FieldValue18, FieldValue19, FieldValue20,
        FieldValue21, FieldValue22, FieldValue23, FieldValue24, FieldValue25,
        FieldValue26, FieldValue27, FieldValue28, FieldValue29, FieldValue30,
        FieldValue31, FieldValue32, FieldValue33, FieldValue34, FieldValue35,
        FieldValue36, FieldValue37, FieldValue38, FieldValue39, FieldValue40,
        CreatedAt, UpdatedAt, isActive, FormID, ChangeType)
       VALUES
       (:dataId, :templateId,
        :fieldValue1, :fieldValue2, :fieldValue3, :fieldValue4, :fieldValue5,
        :fieldValue6, :fieldValue7, :fieldValue8, :fieldValue9, :fieldValue10,
        :fieldValue11, :fieldValue12, :fieldValue13, :fieldValue14, :fieldValue15,
        :fieldValue16, :fieldValue17, :fieldValue18, :fieldValue19, :fieldValue20,
        :fieldValue21, :fieldValue22, :fieldValue23, :fieldValue24, :fieldValue25,
        :fieldValue26, :fieldValue27, :fieldValue28, :fieldValue29, :fieldValue30,
        :fieldValue31, :fieldValue32, :fieldValue33, :fieldValue34, :fieldValue35,
        :fieldValue36, :fieldValue37, :fieldValue38, :fieldValue39, :fieldValue40,
        GETDATE(), GETDATE(), :isActive, :formId, 'INSERT')`,
			{
				replacements: {
					dataId: formDataRecord.dataId,
					templateId: formDataRecord.templateId,
					fieldValue1: formDataRecord.fieldValue1,
					fieldValue2: formDataRecord.fieldValue2,
					fieldValue3: formDataRecord.fieldValue3,
					fieldValue4: formDataRecord.fieldValue4,
					fieldValue5: formDataRecord.fieldValue5,
					fieldValue6: formDataRecord.fieldValue6,
					fieldValue7: formDataRecord.fieldValue7,
					fieldValue8: formDataRecord.fieldValue8,
					fieldValue9: formDataRecord.fieldValue9,
					fieldValue10: formDataRecord.fieldValue10,
					fieldValue11: formDataRecord.fieldValue11,
					fieldValue12: formDataRecord.fieldValue12,
					fieldValue13: formDataRecord.fieldValue13,
					fieldValue14: formDataRecord.fieldValue14,
					fieldValue15: formDataRecord.fieldValue15,
					fieldValue16: formDataRecord.fieldValue16,
					fieldValue17: formDataRecord.fieldValue17,
					fieldValue18: formDataRecord.fieldValue18,
					fieldValue19: formDataRecord.fieldValue19,
					fieldValue20: formDataRecord.fieldValue20,
					fieldValue21: formDataRecord.fieldValue21,
					fieldValue22: formDataRecord.fieldValue22,
					fieldValue23: formDataRecord.fieldValue23,
					fieldValue24: formDataRecord.fieldValue24,
					fieldValue25: formDataRecord.fieldValue25,
					fieldValue26: formDataRecord.fieldValue26,
					fieldValue27: formDataRecord.fieldValue27,
					fieldValue28: formDataRecord.fieldValue28,
					fieldValue29: formDataRecord.fieldValue29,
					fieldValue30: formDataRecord.fieldValue30,
					fieldValue31: formDataRecord.fieldValue31,
					fieldValue32: formDataRecord.fieldValue32,
					fieldValue33: formDataRecord.fieldValue33,
					fieldValue34: formDataRecord.fieldValue34,
					fieldValue35: formDataRecord.fieldValue35,
					fieldValue36: formDataRecord.fieldValue36,
					fieldValue37: formDataRecord.fieldValue37,
					fieldValue38: formDataRecord.fieldValue38,
					fieldValue39: formDataRecord.fieldValue39,
					fieldValue40: formDataRecord.fieldValue40,
					createdAt: formDataRecord.createdAt,
					updatedAt: formDataRecord.updatedAt,
					isActive: formDataRecord.isActive,
					formId: formId,
				},
				transaction: t,
			}
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

// formDataRouter.put('/:id', async (req, res) => {
// 	try {
// 		const dataId = req.params.id
// 		const updatedData = req.body

// 		// Map the form fields to the correct fieldValue columns
// 		const mappedData = {
// 			fieldValue1: updatedData.registrationNumber,
// 			fieldValue2: updatedData.firstName,
// 			fieldValue3: updatedData.lastName,
// 			fieldValue4: updatedData.fathersName,
// 			fieldValue5: updatedData.email,
// 			fieldValue6: updatedData.gender,
// 			fieldValue7: updatedData.dateOfBirth,
// 			fieldValue8: updatedData.address,
// 			fieldValue9: updatedData.phoneNumber,
// 			fieldValue10: updatedData.departmentId,
// 			fieldValue11: updatedData.batchYear,
// 			fieldValue12: updatedData.currentSemester,
// 			fieldValue13: updatedData.shift,
// 		}

// 		await FormData.update(mappedData, {
// 			where: { dataId: dataId },
// 		})

// 		res.json({ message: 'Record updated successfully' })
// 	} catch (error) {
// 		res.status(500).json({ error: error.message })
// 	}
// })

formDataRouter.put('/:id', async (req, res) => {
	const t = await sequelize.transaction()
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
			updatedAt: new Date(),
		}

		// Now perform the update
		await FormData.update(mappedData, {
			where: { dataId: dataId },
			transaction: t,
		})

		// Fetch the updated record to save to history
		const updatedRecord = await FormData.findByPk(dataId, { transaction: t })
		if (!updatedRecord) {
			await t.rollback()
			return res.status(404).json({ error: 'Record not found' })
		}

		// Save the current state to history before updating
		await sequelize.query(
			`INSERT INTO FormDataHistory
          (DataID, TemplateID, 
           FieldValue1, FieldValue2, FieldValue3, FieldValue4, FieldValue5,
           FieldValue6, FieldValue7, FieldValue8, FieldValue9, FieldValue10,
           FieldValue11, FieldValue12, FieldValue13, FieldValue14, FieldValue15,
           FieldValue16, FieldValue17, FieldValue18, FieldValue19, FieldValue20,
           FieldValue21, FieldValue22, FieldValue23, FieldValue24, FieldValue25,
           FieldValue26, FieldValue27, FieldValue28, FieldValue29, FieldValue30,
           FieldValue31, FieldValue32, FieldValue33, FieldValue34, FieldValue35,
           FieldValue36, FieldValue37, FieldValue38, FieldValue39, FieldValue40,
           CreatedAt, UpdatedAt, isActive, FormID, ChangeType)
          VALUES
          (:dataId, :templateId,
           :fieldValue1, :fieldValue2, :fieldValue3, :fieldValue4, :fieldValue5,
           :fieldValue6, :fieldValue7, :fieldValue8, :fieldValue9, :fieldValue10,
           :fieldValue11, :fieldValue12, :fieldValue13, :fieldValue14, :fieldValue15,
           :fieldValue16, :fieldValue17, :fieldValue18, :fieldValue19, :fieldValue20,
           :fieldValue21, :fieldValue22, :fieldValue23, :fieldValue24, :fieldValue25,
           :fieldValue26, :fieldValue27, :fieldValue28, :fieldValue29, :fieldValue30,
           :fieldValue31, :fieldValue32, :fieldValue33, :fieldValue34, :fieldValue35,
           :fieldValue36, :fieldValue37, :fieldValue38, :fieldValue39, :fieldValue40,
           :createdAt, :updatedAt, :isActive, :formId, 'UPDATE')`,
			{
				replacements: {
					dataId: updatedRecord.dataId,
					templateId: updatedRecord.templateId,
					fieldValue1: updatedRecord.fieldValue1,
					fieldValue2: updatedRecord.fieldValue2,
					fieldValue3: updatedRecord.fieldValue3,
					fieldValue4: updatedRecord.fieldValue4,
					fieldValue5: updatedRecord.fieldValue5,
					fieldValue6: updatedRecord.fieldValue6,
					fieldValue7: updatedRecord.fieldValue7,
					fieldValue8: updatedRecord.fieldValue8,
					fieldValue9: updatedRecord.fieldValue9,
					fieldValue10: updatedRecord.fieldValue10,
					fieldValue11: updatedRecord.fieldValue11,
					fieldValue12: updatedRecord.fieldValue12,
					fieldValue13: updatedRecord.fieldValue13,
					fieldValue14: updatedRecord.fieldValue14,
					fieldValue15: updatedRecord.fieldValue15,
					fieldValue16: updatedRecord.fieldValue16,
					fieldValue17: updatedRecord.fieldValue17,
					fieldValue18: updatedRecord.fieldValue18,
					fieldValue19: updatedRecord.fieldValue19,
					fieldValue20: updatedRecord.fieldValue20,
					fieldValue21: updatedRecord.fieldValue21,
					fieldValue22: updatedRecord.fieldValue22,
					fieldValue23: updatedRecord.fieldValue23,
					fieldValue24: updatedRecord.fieldValue24,
					fieldValue25: updatedRecord.fieldValue25,
					fieldValue26: updatedRecord.fieldValue26,
					fieldValue27: updatedRecord.fieldValue27,
					fieldValue28: updatedRecord.fieldValue28,
					fieldValue29: updatedRecord.fieldValue29,
					fieldValue30: updatedRecord.fieldValue30,
					fieldValue31: updatedRecord.fieldValue31,
					fieldValue32: updatedRecord.fieldValue32,
					fieldValue33: updatedRecord.fieldValue33,
					fieldValue34: updatedRecord.fieldValue34,
					fieldValue35: updatedRecord.fieldValue35,
					fieldValue36: updatedRecord.fieldValue36,
					fieldValue37: updatedRecord.fieldValue37,
					fieldValue38: updatedRecord.fieldValue38,
					fieldValue39: updatedRecord.fieldValue39,
					fieldValue40: updatedRecord.fieldValue40,
					createdAt: updatedRecord.createdAt,
					updatedAt: updatedRecord.updatedAt,
					isActive: updatedRecord.isActive,
					formId: updatedRecord.formId,
				},
				transaction: t,
			}
		)

		await t.commit()
		res.json({ message: 'Record updated successfully' })
	} catch (error) {
		await t.rollback()
		console.error('Error updating record:', error)
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
