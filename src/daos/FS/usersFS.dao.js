
const { userModel } = require('../../models/user.model.js');

class UsersDaoFS {
    constructor(){
        this.userModel = userModel
    }

    get    = async _ => await this.userModel.find({})
    create = async newUser => await this.userModel.create(newUser)
    getBy  = async (filter) => 'get user'
    update = async (uid, usersToUpdate) => 'update user'
    delete = async uid => 'delete user'
}

module.exports = UsersDaoFS

