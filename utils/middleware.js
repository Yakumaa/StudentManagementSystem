const jwt = require('jsonwebtoken')
const Student = require('../models/Student')
const Admin = require('../models/Admin')

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:', request.path)
	console.log('Body:', request.body)
	console.log('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown request' })
}

const errorHandler = (error, request, response, next) => {
	console.log(error.message)
	if (error.name === 'ValidationError') {
		return response.status(400).send({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).send({ error: error.message })
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).send({ error: error.message })
	}
	next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	console.log('authorization', authorization)
	if (authorization && authorization.startsWith('Bearer ')) {
		request.token = authorization.substring(7)
	} else {
		request.token = null
	}
	next()
}

const userExtractor = async (req, res, next) => {
	try {
		if (!req.token) {
			return res.status(401).json({ error: 'Token missing' })
		}

		const decodedToken = jwt.verify(req.token, process.env.SECRET)

		if (!decodedToken.id) {
			return res.status(401).json({ error: 'Invalid token' })
		}

		req.user = { id: decodedToken.id }
		next()
	} catch (error) {
		res.status(401).json({ error: 'Invalid or expired token' })
	}
}

module.exports = {
	tokenExtractor,
	userExtractor,
	requestLogger,
	unknownEndpoint,
	errorHandler,
}
