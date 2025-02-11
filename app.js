const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const sequelize = require('./utils/config')
const loginRouter = require('./controller/login')
const studentRouter = require('./controller/students')
const adminRouter = require('./controller/admins')
const departmentRouter = require('./controller/departments')
const attendanceRouter = require('./controller/attendances')
const formTemplateRouter = require('./controller/formTemplates')
const formFieldRouter = require('./controller/formFields')
const formDataRouter = require('./controller/formData')

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)
app.use(express.static('public'))

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

app.use('/api/login', loginRouter)
app.use('/api/students', studentRouter)
app.use('/api/admins', adminRouter)
app.use('/api/departments', departmentRouter)
app.use('/api/attendances', attendanceRouter)
app.use('/api/form-templates', formTemplateRouter)
app.use('/api/form-fields', formFieldRouter)
app.use('/api/form-data', formDataRouter)

app.use(middleware.requestLogger)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
