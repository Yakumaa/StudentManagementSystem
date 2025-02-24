const FormData = require('../models/FormData')
const FormDataHistory = require('../models/FormDataHistory')
const Form = require('../models/Form')
const FormHistory = require('../models/FormHistory')
const FormFile = require('../models/FormFile')
const FormFileHistory = require('../models/FormFileHistory')
const sequelize = require('../utils/config')
const defineAssociations = require('../models/associations')
const formDataRouter = require('express').Router()
const { tokenExtractor, userExtractor } = require('../utils/middleware')

defineAssociations()

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

// formDataRouter.get('/', async (req, res) => {
// 	try {
// 		const formData = await FormData.findAll({
// 			where: { isActive: 1 }, // Only get active records
// 		})
// 		res.json(formData)
// 	} catch (error) {
// 		res.status(500).json({ error: error.message })
// 	}
// })

formDataRouter.get('/', async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1
		const limit = parseInt(req.query.limit) || 10
		const offset = (page - 1) * limit

		const formData = await FormData.findAndCountAll({
			where: { isActive: 1 },
			limit: limit,
			offset: offset,
			order: [['dataId', 'DESC']], // Optional: Order by ID descending
		})

		res.json({
			total: formData.count,
			totalPages: Math.ceil(formData.count / limit),
			currentPage: page,
			data: formData.rows,
		})
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

// Get total count of records
formDataRouter.get('/count', async (req, res) => {
	try {
		const count = await FormData.count({
			where: { isActive: 1 },
		})

		res.json({ count })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

// Get profile picture
formDataRouter.get('/:id/profile-picture', async (req, res) => {
	try {
		const formFile = await FormFile.findOne({
			where: {
				formId: req.params.id,
				fileName: { [Op.like]: '%profile%' }, // Assuming profile pictures have "profile" in filename
			},
		})

		if (!formFile) {
			return res.status(404).send('Profile picture not found')
		}

		res.setHeader('Content-Type', formFile.fileType)
		res.setHeader('Content-Disposition', `inline; filename="${formFile.fileName}"`)
		res.send(formFile.fileData)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

// Get academic documents
formDataRouter.get('/:id/academic-docs', async (req, res) => {
	try {
		const formFile = await FormFile.findOne({
			where: {
				formId: req.params.id,
				fileName: { [Op.like]: '%academic%' }, // Assuming academic docs have "academic" in filename
			},
		})

		if (!formFile) {
			return res.status(404).send('Academic documents not found')
		}

		res.setHeader('Content-Type', formFile.fileType)
		res.setHeader('Content-Disposition', `attachment; filename="${formFile.fileName}"`)
		res.send(formFile.fileData)
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
				// submittedAt: new Date(),
			},
			{ transaction: t }
		)

		console.log('form', form)
		await FormHistory.create(
			{
				formId: form.formId,
				templateId: form.templateId,
				submittedBy: form.submittedBy,
				// submittedAt: form.submittedAt,

				submittedAt: sequelize.literal(`CONVERT(DATETIME, '${formatLocalDate(new Date(form.submittedAt))}', 120)`),
				changeType: 'INSERT',
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

			// Create history record for profile picture
			await FormFileHistory.create(
				{
					fileId: profilePictureRecord.fileId,
					formId: profilePictureRecord.formId,
					fileName: profilePictureRecord.fileName,
					fileData: profilePictureRecord.fileData,
					fileType: profilePictureRecord.fileType,
					fileSize: profilePictureRecord.fileSize,
					createdAt: sequelize.literal(
						`CONVERT(DATETIME, '${formatLocalDate(new Date(profilePictureRecord.createdAt))}', 120)`
					),
					updatedAt: sequelize.literal(
						`CONVERT(DATETIME, '${formatLocalDate(new Date(profilePictureRecord.updatedAt))}', 120)`
					),
					changeType: 'INSERT',
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

			// Create history record for academic documents
			await FormFileHistory.create(
				{
					fileId: academicDocsRecord.fileId,
					formId: academicDocsRecord.formId,
					fileName: academicDocsRecord.fileName,
					fileData: academicDocsRecord.fileData,
					fileType: academicDocsRecord.fileType,
					fileSize: academicDocsRecord.fileSize,
					createdAt: sequelize.literal(
						`CONVERT(DATETIME, '${formatLocalDate(new Date(academicDocsRecord.createdAt))}', 120)`
					),
					updatedAt: sequelize.literal(
						`CONVERT(DATETIME, '${formatLocalDate(new Date(academicDocsRecord.updatedAt))}', 120)`
					),

					changeType: 'INSERT',
				},
				{ transaction: t }
			)

			// Save only the file name
			academicDocsName = academicDocsRecord.fileName
		}

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

formDataRouter.put('/:id', async (req, res) => {
	let t
	try {
		t = await sequelize.transaction()
		const dataId = req.params.id
		const updatedData = req.body

		// Fetch the current record before updating
		const currentRecord = await FormData.findByPk(dataId, { transaction: t })
		if (!currentRecord) {
			await t.rollback()
			return res.status(404).json({ error: 'Record not found' })
		}

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

		console.log('CreatedAt:', currentRecord.createdAt, typeof currentRecord.createdAt)
		console.log('UpdatedAt:', updatedRecord.updatedAt, typeof updatedRecord.updatedAt)

		// Create history record using the model
		await FormDataHistory.create(
			{
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
				createdAt: sequelize.literal(`CONVERT(DATETIME, '${formatLocalDate(new Date(currentRecord.createdAt))}', 120)`),
				updatedAt: sequelize.literal(`CONVERT(DATETIME, '${formatLocalDate(new Date(updatedRecord.updatedAt))}', 120)`),
				// createdAt: currentRecord.createdAt,
				// updatedAt: updatedRecord.updatedAt,
				isActive: updatedRecord.isActive,
				formId: updatedRecord.formId,
				changeType: 'UPDATE',
			},
			{ transaction: t }
		)

		await t.commit()
		res.json({ message: 'Record updated successfully' })
	} catch (error) {
		if (t && !t.finished) {
			try {
				await t.rollback()
			} catch (rollbackError) {
				console.error('Rollback error:', rollbackError)
			}
		}
		console.error('Error updating record:', error)
		res.status(500).json({ error: error.message })
	}
})

formDataRouter.delete('/:id', async (req, res) => {
	let t
	try {
		t = await sequelize.transaction()
		const dataId = req.params.id
		console.log('deleteid', dataId)

		// Fetch the current record before updating
		const currentRecord = await FormData.findByPk(dataId, { transaction: t })
		if (!currentRecord) {
			await t.rollback()
			return res.status(404).json({ error: 'Record not found' })
		}

		// Update the record (e.g., mark it as inactive)
		await FormData.update({ isActive: 0, updatedAt: new Date() }, { where: { dataId: dataId }, transaction: t })

		// Fetch the updated record after deactivation
		const updatedRecord = await FormData.findByPk(dataId, { transaction: t })
		if (!updatedRecord) {
			await t.rollback()
			return res.status(404).json({ error: 'Record not found after deletion' })
		}

		// Create a history record for the deletion
		await FormDataHistory.create(
			{
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
				createdAt: sequelize.literal(`CONVERT(DATETIME, '${formatLocalDate(new Date(currentRecord.createdAt))}', 120)`),
				updatedAt: sequelize.literal(`CONVERT(DATETIME, '${formatLocalDate(new Date(updatedRecord.updatedAt))}', 120)`),
				isActive: updatedRecord.isActive, // should now be 0
				formId: updatedRecord.formId,
				changeType: 'DELETE',
			},
			{ transaction: t }
		)

		await t.commit()
		res.json({ message: 'Record deactivated successfully' })
	} catch (error) {
		if (t && !t.finished) {
			try {
				await t.rollback()
			} catch (rollbackError) {
				console.error('Rollback error:', rollbackError)
			}
		}
		console.error('Error updating record:', error)
		res.status(500).json({ error: error.message })
	}
})

module.exports = formDataRouter
