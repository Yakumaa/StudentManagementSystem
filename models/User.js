const { DataTypes } = require('sequelize')
const sequelize = require('../utils/config')

const User = sequelize.define(
	'User',
	{
		userId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: 'userID',
		},
		username: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
		},
		passwordHash: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		userTypeID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'UserTypes',
				key: 'TypeID',
			},
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: 1,
			field: 'isActive',
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal('GETDATE()'), // Use SQL Server's GETDATE()
			field: 'createdAt',
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal('GETDATE()'), // Use SQL Server's GETDATE()
			field: 'updatedAt',
		},
	},
	{
		tableName: 'Users',
		timestamps: true,
	}
)

module.exports = User
