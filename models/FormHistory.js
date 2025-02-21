const { DataTypes } = require('sequelize')
const sequelize = require('../utils/config')

const FormHistory = sequelize.define(
	'FormHistory',
	{
		historyId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: 'HistoryID',
		},
		formId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'FormID',
			references: {
				model: 'Form',
				key: 'FormID',
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
		submittedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'submittedAt',
		},
		submittedBy: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'submittedBy',
			references: {
				model: 'Users',
				key: 'userID',
			},
		},
		changeType: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'ChangeType',
		},
	},
	{
		tableName: 'FormHistory',
		timestamps: false,
	}
)

module.exports = FormHistory
