const { DataTypes } = require('sequelize')
const sequelize = require('../utils/config')

const UserType = sequelize.define(
	'UserType',
	{
		typeId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: 'TypeID',
		},
		typeName: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique: true,
			field: 'TypeName',
		},
	},
	{
		tableName: 'UserTypes',
		timestamps: false,
	}
)

module.exports = UserType
