const { DataTypes } = require('sequelize')
const sequelize = require('../utils/config')

const FormTemplate = sequelize.define(
	'FormTemplate',
	{
		templateId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: 'TemplateID',
		},
		templateName: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'TemplateName',
		},
		description: {
			type: DataTypes.TEXT,
			field: 'Description',
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			field: 'IsActive',
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			field: 'CreatedAt',
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			field: 'UpdatedAt',
		},
	},
	{
		tableName: 'FormTemplates',
		timestamps: false,
	}
)

module.exports = FormTemplate
