const SessionsDaoMongo = require('../daos/MONGO/sessions.dao.js');
const { createHash, isValidPassword } = require('../utils/hash.js');
const { generateToken } = require('../utils/authToken.js');
const { token } = require('morgan');

class SessionsController {
  constructor() {
    this.services = new SessionsDaoMongo();
  }

  register = async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send({ status: 'error', error: 'email y password son obligatorios' });
      }

      const userFound = await this.services.getUser(email);
      if (userFound) {
        return res.status(401).send({ status: 'error', error: 'El usuario ya existe' });
      }

      const newUser = {
        first_name,
        last_name,
        email,
        password: await createHash(password)

      };

      const result = await this.services.createUser(newUser);
      res.send({ status: 'success', payload: result });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: 'error', message: 'Error en el registro' });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ status: 'error', message: 'Email and password are required' });
    }

    const userFound = await this.services.getUser(email);
    if (!userFound) {
      return res.status(401).send({ status: 'error', message: 'usuario no existe' });
    }

    if (!isValidPassword(password, userFound.password)) {
      return res.status(401).send({ status: 'error', error: 'No coinciden las credenciales' });
    }

    const token = generateToken({
      id: userFound._id,
      email: userFound.email,
      role: userFound.role,
      
    });

    res
    .cookie('coderCookieToken', token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true
    })
    .send({ status: 'success', message: 'Logged successfully', token });
  };

  logout = (req, res) => {
    req.session.destroy(error => {
      if (error) return res.send(error);
      res.send('logout');
    });
  };

  current = (req, res) => {
    res.send({ status: 'success', payload: req.user });
  };
}

module.exports = SessionsController;
