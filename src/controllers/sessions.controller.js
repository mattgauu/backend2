
const SessionsDaoMongo = require('../dao/sessions.dao.js');
const { createHash, isValidPassword } = require('../utils/hash.js');
const { generateToken } = require('../utils/authToken.js');
class SessionsController {
    constructor(){
        this.services = new SessionsDaoMongo()}
    register = async (req, res) => {
            try {
                const { first_name, last_name, age, email, password } = req.body;
                console.log(req.body);
                if (!email || !password) {
                    return res.status(400).send({ status: 'error', message: 'Email and password are required' });
                }
                const userFound = await this.services.getUser({ email });
                if (userFound) {
                    return res.status(401).send({ status: 'error', message: 'Email already registered' });
                }
                const hashedPassword = await createHash(password);
                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email,
                    password: hashedPassword,
                };
    
                const result = await this.services.createUser(newUser);
                res.send({ status: 'success', paylad: result });
    
            } catch (error) {
                console.error('Error en registro:', error);
                res.status(500).send({ status: 'error', message: 'Internal Server Error' });
            }
        
    login = async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ status: 'error', message: 'Email and password are required' });
        }
        const userFound = await this.services.getUser({ email });
        if (!userFound) {
            return res.status(401).send({ status: 'error', message: 'usuario no existe' });
        }
        if(!isValidPassword(password, userFound.password)) return res.status(401).send({status: 'error', error: 'No coinciden las credenciales'})
        const token = generateToken({
            id: userFound._id,
            email: userFound.email,
            role: userFound.role
            
        });
        res
            .cookie('coderCookieToken', token, {
                maxAge: 60*60*1000,
                httpOnly: true
            })
            .send({status: 'success', messagge: 'Logged succes'})
        }
    logout = (req, res) => {
        req.session.destroy(error => {
            if (error) return  res.send(error)
            res.send('logout')
            
        })
    }
    current = (req, res) => {
        res.send({status: 'success', payload: req.user})
    }

  }
}
module.exports = SessionsController;