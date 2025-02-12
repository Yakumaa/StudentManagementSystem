const Student = require('./Student')
const Department = require('./Department')
const Admin = require('./Admin')
const AttendanceRecord = require('./AttendanceRecord')
const FormTemplate = require('./FormTemplate')
const FormField = require('./FormField')
const FormData = require('./FormData')

const defineAssociations = () => {
	// Department - Student associations
	Department.hasMany(Student, {
		foreignKey: 'departmentId',
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})
	Student.belongsTo(Department, {
		foreignKey: 'departmentId',
	})

	// Student - AttendanceRecord associations
	Student.hasMany(AttendanceRecord, {
		foreignKey: 'studentId',
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	AttendanceRecord.belongsTo(Student, {
		foreignKey: 'studentId',
	})

	// Admin - AttendanceRecord associations
	Admin.hasMany(AttendanceRecord, {
		foreignKey: 'createdBy',
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE',
	})
	AttendanceRecord.belongsTo(Admin, {
		foreignKey: 'createdBy',
	})

	FormTemplate.hasMany(FormField, {
		foreignKey: 'templateId',
		as: 'fields',
	})

	FormField.belongsTo(FormTemplate, {
		foreignKey: 'templateId',
		as: 'template',
	})

	// FormData.belongsTo(FormField, {
	// 	foreignKey: 'fieldId',
	// 	as: 'field',
	// })

	FormData.belongsTo(FormTemplate, {
		foreignKey: 'templateId',
		as: 'template',
	})

	// FormData.belongsTo(Student, {
	// 	foreignKey: 'studentId',
	// 	as: 'student',
	// })
}

module.exports = defineAssociations
