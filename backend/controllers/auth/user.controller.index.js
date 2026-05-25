const login = require('./user.login.controller')
const register = require('./user.register.controller')
const getProtectedData = require('./user.protected.controller')

module.exports = { login, register, getProtectedData }