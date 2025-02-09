const { DataTypes } = require("sequelize");
const sequelize = require("../utils/config");

const Department = sequelize.define('Department', {
  departmentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'DepartmentID'
  },
  departmentName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: 'DepartmentName'
  }
}, {
  tableName: 'Departments',
  createdAt: 'CreatedAt',
  updatedAt: false
});

module.exports = Department;