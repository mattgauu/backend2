const { userDao } = require('../daos/MONGO/users.dao');
const UserDTO = require('../dtos/UserDTO');

class UsersService {
  async getUsers() {
    const users = await userDao.get();
    return users.map(user => new UserDTO(user));
  }

  async getUser(id) {
    const user = await userDao.getBy({ _id: id });
    return user ? new UserDTO(user) : null;
  }

  async createUser(userData) {
    const newUser = await userDao.create(userData);
    return new UserDTO(newUser);
  }

  async updateUserRole(id, newRole) {
    return await userDao.update(id, { role: newRole });
  }
}

module.exports = new UsersService();