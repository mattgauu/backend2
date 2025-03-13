const bcrypt = require ('bcrypt');

const createHash = async (password) => bcrypt.hash(password, bcrypt.genSaltSync(10));
const isValidPassword = (password, userPasswordDb) => bcrypt.compareSync(password, userPasswordDb)

module.exports = { createHash, isValidPassword }