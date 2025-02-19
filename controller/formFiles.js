const FormFile = require('../models/FormFile')
const formFilesRouter = require('express').Router()

formFilesRouter.get('/', async (req, res) => {
	try {
		const formFiles = await FormFile.findAll({})
		res.json(formFiles)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

formFilesRouter.get('/:id', async (req, res) => {
	try {
		const formFile = await FormFile.findByPk(req.params.id)
		if (!formFile) {
			return res.status(404).json({ error: 'File not found' })
		}

		// Set the appropriate content type and send the binary data
		res.set('Content-Type', formFile.FileType)
		res.send(formFile.FileData)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

formFilesRouter.post('/', async (req, res) => {
	try {
		console.log(req.body)
		const { FormID, FileName, FileData, FileType, FileSize } = req.body

		// Validate required fields
		if (!FormID || !FileName || !FileData || !FileType) {
			return res.status(400).json({ error: 'FormID, FileName, FileData, and FileType are required.' })
		}

		// Convert Base64 string to a Buffer (binary data)
		const fileBuffer = Buffer.from(FileData, 'base64')

		// Optionally, determine file size if not provided
		const size = FileSize || fileBuffer.length

		// Create the file record in the database
		const newFile = await FormFile.create({
			formId: FormID,
			fileName: FileName,
			fileData: fileBuffer,
			fileType: FileType,
			fileSize: size,
			// createdAt: new Date(),
		})

		res.status(201).json({ message: 'File uploaded successfully', file: newFile })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

module.exports = formFilesRouter
