const { DataTypes } = require("sequelize");
const sequelize = require("../utils/config");

const Admin = sequelize.define('Admin', {
  adminId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'AdminID'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'Name'
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: 'Email',
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'Password'
  },
  contactNumber: {
    type: DataTypes.STRING(20),
    field: 'ContactNumber'
  },
  lastLogin: {
    type: DataTypes.DATE,
    field: 'LastLogin'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'IsActive'
  }
}, {
  tableName: 'Admins',
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Admin;