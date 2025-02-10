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
		request.token = authorization.replace('Bearer ', '')
	} else {
		request.token = null
	}
	next()
}

// const userExtractor = async (req, res, next) => {
// 	try {
// 		// 🔹 Debug logs for token extraction
// 		console.log('Token received for verification:', req.token)

// 		if (!req.token) {
// 			return res.status(401).json({ error: 'Token missing' })
// 		}

// 		// 🔹 Try to decode the token
// 		let decodedToken
// 		try {
// 			decodedToken = jwt.verify(req.token, process.env.SECRET)
// 			console.log('Decoded token:', decodedToken)
// 		} catch (error) {
// 			console.error('JWT Verification Error:', error.message)
// 			return res.status(401).json({ error: 'Invalid or expired token' })
// 		}

// 		// 🔹 Check for valid ID in token
// 		if (!decodedToken.id) {
// 			return res.status(401).json({ error: 'Invalid token structure' })
// 		}

// 		// 🔹 Fetch the user based on ID and userType
// 		let user = null
// 		if (decodedToken.userType === 'student') {
// 			user = await Student.findByPk(decodedToken.id)
// 		} else if (decodedToken.userType === 'admin') {
// 			user = await Admin.findByPk(decodedToken.id)
// 		}

// 		// 🔹 Handle user not found
// 		if (!user) {
// 			return res.status(404).json({ error: 'User not found' })
// 		}

// 		// 🔹 Attach user data to request
// 		req.user = user
// 		req.userType = decodedToken.userType
// 		console.log('User authenticated:', req.userType, req.user.email)

// 		next()
// 	} catch (error) {
// 		console.error('UserExtractor Error:', error.message)
// 		res.status(401).json({ error: 'Invalid or expired token' })
// 	}
// }

module.exports = {
	tokenExtractor,
	// userExtractor,
	requestLogger,
	unknownEndpoint,
	errorHandler,
}
