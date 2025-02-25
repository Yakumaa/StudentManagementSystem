const Department = require('./Department')
const FormTemplate = require('./FormTemplate')
const FormField = require('./FormField')
const FormData = require('./FormData')
const Form = require('./Form')
const User = require('./User')
const UserType = require('./UserType')
const FormFile = require('./FormFile')

const defineAssociations = () => {
	FormTemplate.hasMany(FormField, {
		foreignKey: 'templateId',
		as: 'fields',
	})

	FormField.belongsTo(FormTemplate, {
		foreignKey: 'templateId',
		as: 'template',
	})

	// FormData.belongsTo(FormField, {
	// 	foreignKey: 'fieldId',
	// 	as: 'field',
	// })

	FormData.belongsTo(FormTemplate, {
		foreignKey: 'templateId',
		as: 'template',
	})

	FormData.belongsTo(Form, {
		foreignKey: 'formId',
		as: 'form',
	})

	Form.hasMany(FormData, {
		foreignKey: 'formId',
		as: 'data',
	})

	Form.belongsTo(FormTemplate, {
		foreignKey: 'templateId',
		as: 'template',
	})

	Form.belongsTo(User, {
		foreignKey: 'submittedBy',
		as: 'user',
	})

	User.hasMany(Form, {
		foreignKey: 'submittedBy',
		as: 'forms',
	})

	User.belongsTo(UserType, {
		foreignKey: 'userTypeID',
		as: 'type',
	})

	FormFile.belongsTo(Form, {
		foreignKey: 'formId',
		as: 'form',
	})

	Form.hasMany(FormFile, {
		foreignKey: 'formId',
		as: 'files',
	})
}

module.exports = defineAssociations
