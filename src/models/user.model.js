const { Schema, model } = require ('mongoose');


const userCollection = 'users'
const userSchema = new Schema({
    first_name: String,
    last_name: String,
    age: Number,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
})

const userModel = model(userCollection, userSchema)

module.exports = { userModel }