const { Account } = require('../models');
const { randomPassword } = require('../helpers/randomPass')
const { generateToken, verifyToken} = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class Controller {
  static async register(req, res, next) {
    let { name, phone, role } = req.body

    try {
      const checkPhone = await Account.findOne({
        where: { phone }
      })

      if (checkPhone?.phone && checkPhone?.phone === phone) {
        next({ name: "PhoneNumberDuplicateError" })
      }

      const newPassword = randomPassword(4)
      const account = await Account.create({
        phone,
        name,
        role,
        password: newPassword
      })

      res.status(201).json({
        name: account.name,
        phone: account.phone,
        role: account.role,
        password: newPassword
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    let { phone, password } = req.body

    try {
      let account  = await Account.findOne({
        where: { phone }
      })

      if (!account) {
        next({ name: "LoginError" })
      } 

      let checkPass = comparePassword(password, account.password)
      
      if (!checkPass) {
        next({ name: "LoginError" })
      }

      const payload = {
        name: account.name,
        phone: account.phone,
        role: account.role,
        timestamp: account.createdAt
      }

      const token = generateToken(payload)

      res.status(200).json({ token })
    } catch(err) {
      next(err)
    }
  }

  static async validateToken(req, res, next) {
    // get token from dynamic param :token
    const token = req.params.token

    const decodedToken = verifyToken(token)

    if (decodedToken.name === "JsonWebTokenError") {
      next({ name: "JsonWebTokenError" })
    } else {
      res.status(200).json(decodedToken)
    }
  }
}

module.exports = Controller