const jwt = require('jsonwebtoken');

function generateToken(decoded) {
  return jwt.sign(decoded, process.env.SECRET_TOKEN)
}

function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
    if (err) {
      return err
    } else {
      return decoded
    }
  })
}

module.exports = {
  generateToken, verifyToken
}