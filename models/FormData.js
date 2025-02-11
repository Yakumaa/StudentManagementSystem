const { DataTypes } = require('sequelize')
const sequelize = require('../utils/config')

const FormData = sequelize.define(
	'FormData',
	{
		dataId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: 'DataID',
		},
		studentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'StudentID',
			references: {
				model: 'Students',
				key: 'StudentID',
			},
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
		fieldId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'FieldID',
			references: {
				model: 'FormFields',
				key: 'FieldID',
			},
		},
		fieldValue: {
			type: DataTypes.TEXT,
			field: 'FieldValue',
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
		tableName: 'FormData',
		timestamps: false,
	}
)

module.exports = FormData
