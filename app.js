const express = require('express')
const app = express()
const cors = require('cors')

const studentRouter = require('./controller/students')

const middleware = require('./utils/middleware')
const sequelize = require('./utils/config')
const Department = require('./models/Department')

app.use(cors())
app.use(express.json())

const testConnection = async () => {
	try {
		await sequelize.authenticate()
		console.log('Connection to SQL Server has been established successfully.')
	} catch (error) {
		console.error('Unable to connect to the database:', error)
		process.exit(1)
	}
}

testConnection()

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.get('/api/departments', async (req, res) => {
	try {
		const departments = await Department.findAll()
		res.json(departments)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

app.use('/api/students', studentRouter)

app.use(middleware.requestLogger)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
