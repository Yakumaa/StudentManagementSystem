const { DataTypes } = require('sequelize')
const sequelize = require('../utils/config')

const UserHistory = sequelize.define(
	'UserHistory',
	{
		historyId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: 'HistoryID',
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'userID',
			references: {
				model: 'Users',
				key: 'userID',
			},
		},
		username: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'username',
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'email',
		},
		passwordHash: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'passwordHash',
		},
		userTypeID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'UserTypes',
				key: 'TypeID',
			},
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'createdAt',
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'updatedAt',
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			field: 'isActive',
		},
		changeType: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'ChangeType',
		},
	},
	{
		tableName: 'UserHistory',
		timestamps: false,
	}
)

module.exports = UserHistory
