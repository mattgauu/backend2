// src/dtos/users.dto.js
class UserDto {
    constructor(user) {
      this.first_name = user.first_name
      this.last_name = user.last_name
      this.full_name = `${user.first_name} ${user.last_name}`
      this.email = user.email
      this.password = user.password
      // Agrega otros campos según necesites
    }
  }
  
  module.exports = { UserDto };