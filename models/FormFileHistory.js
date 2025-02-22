const { DataTypes } = require('sequelize')
const sequelize = require('../utils/config')

const FormFileHistory = sequelize.define(
	'FormFileHistory',
	{
		historyId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: 'HistoryID',
		},
		fileId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'FileID',
			references: {
				model: 'FormFile',
				key: 'FileID',
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
		fileName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'FileName',
		},
		fileData: {
			type: DataTypes.BLOB('long'),
			allowNull: false,
			field: 'FileData',
		},
		fileType: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'FileType',
		},
		fileSize: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'FileSize',
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal('GETDATE()'),
			field: 'CreatedAt',
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal('GETDATE()'),
			field: 'UpdatedAt',
		},
		changeType: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'ChangeType',
		},
	},
	{
		tableName: 'FormFileHistory',
		timestamps: true,
	}
)

module.exports = FormFileHistory
