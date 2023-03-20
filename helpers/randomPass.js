const baseCharacter = 'abcdefghijklmnopqrstuvwxyz0123456789'

function randomPassword(len) {
  // generate random password with max length by param len
  let password = ''

  for (let i = 0; i < len; i++) {
    password += baseCharacter.charAt(Math.floor(Math.random() * baseCharacter.length))
  }

  return password
}

module.exports = {
  randomPassword
}