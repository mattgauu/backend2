const mongoose = require ("mongoose")
const { MongoSingleton } = require("../utils/MongoSingleton")

const configObject = {
    port: process.env.PORT || 8080
}

const conectDB =  () => {
    
    return MongoSingleton.getInstance('mongodb+srv://mgaunatesta:mansana123@cluster0.mwc2x.mongodb.net/bend1p')
 
}


module.exports = {conectDB, configObject}