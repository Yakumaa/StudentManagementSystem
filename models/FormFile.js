const { DataTypes } = require('sequelize')
const sequelize = require('../utils/config')

const FormFile = sequelize.define(
	'FormFile',
	{
		fileId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: 'FileID',
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
	},
	{
		tableName: 'FormFiles',
		timestamps: true,
	}
)

module.exports = FormFile
