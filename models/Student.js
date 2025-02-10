const { DataTypes } = require('sequelize')
const sequelize = require('../utils/config')

const Student = sequelize.define(
	'Student',
	{
		studentId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: 'StudentID',
		},
		registrationNumber: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique: true,
			field: 'RegistrationNumber',
		},
		firstName: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'FirstName',
		},
		lastName: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'LastName',
		},
		fathersName: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'FathersName',
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
			field: 'Email',
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'Password',
		},
		gender: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'Gender',
			validate: {
				isIn: [['Male', 'Female', 'Other']],
			},
		},
		dateOfBirth: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'DateOfBirth',
		},
		address: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'Address',
		},
		phoneNumber: {
			type: DataTypes.STRING(20),
			allowNull: false,
			field: 'PhoneNumber',
		},
		departmentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'DepartmentID',
			references: {
				model: 'Departments',
				key: 'DepartmentID',
			},
		},
		batchYear: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'BatchYear',
		},
		currentSemester: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'CurrentSemester',
			validate: {
				min: 1,
				max: 8,
			},
		},
		shift: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'Shift',
			validate: {
				isIn: [['Morning', 'Day']],
			},
		},
		profilePicture: {
			type: DataTypes.STRING(255),
			field: 'ProfilePicture',
		},
		attendance: {
			type: DataTypes.DECIMAL(5, 2),
			defaultValue: 0.0,
			field: 'Attendance',
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			field: 'IsActive',
		},
	},
	{
		tableName: 'Students',
		timestamps: false, // Disable automatic timestamps
	}
)

module.exports = Student
