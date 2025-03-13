const jwt = require ('jsonwebtoken');


const PRIVATE_KEY = 'my-private-key'
const generateToken = userData => jwt.sign(userData, PRIVATE_KEY, { expiresIn: '10d' });


module.exports = { generateToken , PRIVATE_KEY}