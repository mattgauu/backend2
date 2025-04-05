
const { UserDto } = require("../dtos/UserDTO.js");

const { usersService } = require("../services/index.js")

class UserController {
    constructor(){
        this.service = usersService
    }
    
    createUser = async (req, res)=>{
        const { body } = req
        const result = await this.usersService(body)
        
        res.send({status: 'success', payload: result})
    }
    getUsers = async (req, res)=>{
        const users = await this.service.get()
        res.send({status: 'success', paylad: users})
    }
    getUser = (req, res)=>{
        res.send(' get user')
    }
    updateUser = (req, res)=>{
        res.send('update user')
    }
    deleteUser = (req, res)=>{
        res.send('delete user')
    }
}

module.exports = {
    UserController
}