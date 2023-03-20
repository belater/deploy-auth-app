'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Account.init({
    // phone: DataTypes.STRING,
    // name: DataTypes.STRING,
    // role: DataTypes.STRING,
    // password: DataTypes.STRING
    phone : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Phone number / Name / Role is required!'
        },
      }
    },

    name : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Phone number / Name / Role is required!'
        },
      },
    },

    role : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Phone number / Name / Role is required!'
        },
      },
    },

    password : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required!'
        },
      },
    },
  }, {
    hooks: {
      // encrypt password before create using bcrypt
      beforeCreate: (account, options) => {
        const { hashPassword } = require('../helpers/bcrypt')
        account.password = hashPassword(account.password)
      }
    },
    sequelize,
    modelName: 'Account',
  });
  return Account;
};