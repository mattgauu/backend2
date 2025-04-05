const { UserDto } = require("../dtos/UserDTO")


class UserRepository {
    // inección de dependencias
    constructor(dao) {
        this.dao = dao
    }
    
    createUser    = async newUser => {
        const userDto = new UserDto(newUser)
        return await this.dao.create(userDto)
    }
    getUsers      = async () => await this.dao.get()
    getUser = async filter => {
        const user = await this.dao.getBy(filter);
        return user ? new UserDto(user) : null;
    }
    
    updateUser = async (uid, userToUpdate) => {
        const updated = await this.dao.update(uid, userToUpdate);
        return updated;
    }
    
    deleteUser = async (uid) => {
        const deleted = await this.dao.delete(uid);
        return deleted;
    }
    


}

module.exports = {
    UserRepository
}

// new UserRepository(objUserDao)