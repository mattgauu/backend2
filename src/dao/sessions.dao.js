const { userModel } = require("../models/user.model");

class SessionsDaoMongo {
  constructor() {
    this.userModel = userModel;
  }

  getUser = async email => await this.userModel.findOne({email});
  createUser = async newUser => await this.userModel.create(newUser);
  
}

module.exports = SessionsDaoMongo;