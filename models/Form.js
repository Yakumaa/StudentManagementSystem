const { DataTypes } = require('sequelize')
const sequelize = require('../utils/config')

const Form = sequelize.define(
	'Form',
	{
		formId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: 'FormID',
		},
		templateId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'TemplateID',
			references: {
				model: 'FormTemplates',
				key: 'TemplateID',
			},
		},
		submittedBy: {
			type: DataTypes.STRING(255), //TODO: check if this is correct
			allowNull: true,
			field: 'SubmittedBy',
		},
		// submittedAt: {
		// 	type: DataTypes.DATE,
		// 	allowNull: true,
		// 	defaultValue: DataTypes.NOW,
		// 	field: 'SubmittedAt',
		// },
	},
	{
		tableName: 'Form',
		timestamps: false,
	}
)

module.exports = Form
