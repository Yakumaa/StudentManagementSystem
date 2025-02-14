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
			// References your UserTypes table; adjust the model name if needed.
			references: {
				model: 'UserTypes',
				key: 'typeID',
			},
		},
		// createdAt: {
		// 	type: DataTypes.DATE,
		// 	defaultValue: DataTypes.NOW,
		// },
		// updatedAt: {
		// 	type: DataTypes.DATE,
		// 	defaultValue: DataTypes.NOW,
		// },
	},
	{
		tableName: 'Users',
		timestamps: false,
	}
)

module.exports = User
