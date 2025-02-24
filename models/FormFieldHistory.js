const { DataTypes } = require('sequelize')
const sequelize = require('../utils/config')

const FormFieldHistory = sequelize.define(
	'FormFieldHistory',
	{
		historyId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: 'HistoryID',
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
		templateId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'TemplateID',
			references: {
				model: 'FormTemplates',
				key: 'TemplateID',
			},
		},
		fieldName: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'FieldName',
		},
		fieldType: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'FieldType',
			validate: {
				isIn: [['text', 'number', 'date', 'select', 'textarea', 'email']],
			},
		},
		isRequired: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			field: 'IsRequired',
		},
		defaultValue: {
			type: DataTypes.STRING(255),
			field: 'DefaultValue',
		},
		validationRules: {
			type: DataTypes.TEXT,
			field: 'ValidationRules',
			get() {
				const rawValue = this.getDataValue('validationRules')
				return rawValue ? JSON.parse(rawValue) : null
			},
			set(value) {
				this.setDataValue('validationRules', value ? JSON.stringify(value) : null)
			},
		},
		displayOrder: {
			type: DataTypes.INTEGER,
			field: 'DisplayOrder',
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal('GETDATE()'),
			field: 'CreatedAt',
		},
		changeType: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'ChangeType',
		},
	},
	{
		tableName: 'FormFieldHistory',
		timestamps: false,
	}
)

module.exports = FormFieldHistory
