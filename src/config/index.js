const mongoose = require('mongoose')
const dotenv   = require('dotenv')
const { program } = require('../utils/process')

const { mode } = program.opts()
console.log(mode)
dotenv.config({
    path: mode === 'production'? './.env.production' : './.env.developer' 
})


const configObject = {
    port:       process.env.PORT || 8080,
    privateKey: process.env.PRIVATE_KEY,
    mongo_url:  process.env.MONGO_URL,
    persistence: process.env.PERSISTENCE
}
const conectDB =  () => {
    console.log('base de datos conectada')
    mongoose.connect('mongodb+srv://mgaunatesta:mansana123@cluster0.mwc2x.mongodb.net/bend1p')
 
}


module.exports = {conectDB, configObject}