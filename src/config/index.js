const mongoose = require ("mongoose")

const configObject = {
    port: process.env.PORT || 8080
}

const conectDB =  () => {
    console.log('base de datos conectada')
    mongoose.connect('mongodb+srv://mgaunatesta:mansana123@cluster0.mwc2x.mongodb.net/bend1p')
 
}


module.exports = {conectDB, configObject}