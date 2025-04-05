//  MODELO O PERSISTENCIA
const { userModel } = require('../MONGO/models/user.model.js');

class UsersDaoMongo {
    constructor(){
        this.userModel = userModel
    }

    get = async () => await userModel.find();
    create = async newUser => await userModel.create(newUser)
    getBy = async filterObject => await userModel.findOne(filterObject)
    update = async (uid, userToUpdate) => await userModel.findByIdAndUpdate({_id: uid }, userToUpdate, {new: true})
    delete = async uid => await userModel.findByIdAndDelete({_id: uid})
}

module.exports = UsersDaoMongo
