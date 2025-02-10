const { DataTypes } = require('sequelize')
const sequelize = require('../utils/config')

const AttendanceRecord = sequelize.define(
	'AttendanceRecord',
	{
		attendanceId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: 'AttendanceID',
		},
		studentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'StudentID',
			references: {
				model: 'Students',
				key: 'StudentID',
			},
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'Date',
		},
		isPresent: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			field: 'IsPresent',
		},
		remarks: {
			type: DataTypes.STRING(255),
			field: 'Remarks',
		},
		createdBy: {
			type: DataTypes.INTEGER,
			field: 'CreatedBy',
			references: {
				model: 'Admins',
				key: 'AdminID',
			},
		},
	},
	{
		tableName: 'AttendanceRecords',
		timestamps: false,
	}
)

module.exports = AttendanceRecord
