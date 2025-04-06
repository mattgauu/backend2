const { UserDto } = require("../dtos/UserDTO.js");
const { userService } = require("../services/index.js");


class UserController {
    constructor(){
        this.service = userService;

    }
    
    getUsers = async (req, res) => {
        try {
            const users = await this.service.getUsers();
            res.send({ status: 'success', payload: users });
        } catch (error) {
            res.status(500).send({ status: 'error', message: error.message });
        }
    }

    

    getUser= async (req, res) => {
        const {uid} = req.params
        try {
            const user = await this.service.getUser({_id:uid})
            res.send({status: 'success', payload: user})
        } catch (error) {
            console.log(error)
        }
    }

    updateUser= async (req, res, next) => {
        try {
            const updatedUser = await this.service.updateUser(req.params.uid, req.body)
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' })
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error)
        }
    }
    deleteUser = async (req, res, next) => {
        try {
            const deletedUser = await this.service.deleteUser(req.params.uid);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' })
            }
            res.status(204).send();
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    UserController
};
