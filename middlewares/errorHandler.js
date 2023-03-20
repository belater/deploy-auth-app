function errorHandlers(err, req, res, next) {
  console.log("err.name", err.name)
  console.log("err.message", err.message)
  console.log(err)

  let errMsg;

  switch(err.name) {
    case "PhoneNumberDuplicateError":
      res.status(400).json({message: "Phone number already registered"})
      break
    case "SequelizeValidationError":
      errMsg = err.errors.map(el => {
        return { message : el.message }
      })

      res.status(400).json({message: errMsg})
      break
    case "SequelizeConstraintError":
      errMsg = err.errors.map(el => {
        return { message : el.message }
      })
      
      res.status(400).json(errMsg)
      break
    case "LoginError":
      res.status(400).json({message: "Phone number or password is invalid"})
      break
    case "JsonWebTokenError":
      res.status(401).json({message: "Please login first"})
      break
    default:
      res.status(500).json({message: "Internal server error"})
  }
}

module.exports = errorHandlers;