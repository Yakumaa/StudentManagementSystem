const { DataTypes } = require('sequelize')
const sequelize = require('../utils/config')

const FormDataHistory = sequelize.define(
	'FormDataHistory',
	{
		historyId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: 'HistoryID',
		},
		dataId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'DataID',
			//TODO: remove references
			references: {
				model: 'FormData',
				key: 'DataID',
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
		formId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'FormID',
			references: {
				model: 'Form',
				key: 'FormID',
			},
		},
		fieldValue1: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue2: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue3: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue4: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue5: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue6: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue7: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue8: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue9: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue10: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue11: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue12: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue13: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue14: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue15: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue16: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue17: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue18: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue19: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue20: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue21: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue22: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue23: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue24: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue25: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue26: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue27: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue28: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue29: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue30: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue31: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue32: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue33: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue34: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue35: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue36: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue37: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue38: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue39: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		fieldValue40: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: 1,
			field: 'IsActive',
		},
		createdAt: {
			type: DataTypes.DATE,
			// defaultValue: sequelize.literal('GETDATE()'),
			field: 'CreatedAt',
		},
		updatedAt: {
			type: DataTypes.DATE,
			// defaultValue: sequelize.literal('GETDATE()'),
			field: 'UpdatedAt',
		},
		changeType: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'ChangeType',
		},
	},
	{
		tableName: 'FormDataHistory',
		timestamps: false,
	}
)

module.exports = FormDataHistory
