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
