const { Router } = require('express');
const { userModel } = require('../../models/user.model.js');
const { createHash, isValidPassword } = require('../../utils/hash.js');
const { generateToken } = require('../../utils/authToken.js');
const  authToken  = require('../../middleware/auth.middlewares.js');
const passport = require('passport');
const { authentication, authorization } = require('../../middleware/auth.middlewares.js') 
const { passportCall } = require('../../middleware/passportCall.js')




const router = Router()

router.post('/register', async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body;
            console.log(req.body);    
    try {
            if (!email || !password) {
                return res.status(400).send({ status: 'error', message: 'Email and password are required' });
            }
            const userFound = await userModel.findOne({ email });
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

            const result = await userModel.create(newUser);
            res.send({ status: 'success', paylad: result });

        } catch (error) {
            console.error('Error en registro:', error);
            res.status(500).send({ status: 'error', message: 'Internal Server Error' });
        }
    }
)

router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ status: 'error', message: 'Email and password are required' });
        }
        const userFound = await userModel.findOne({ email });
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
)
 
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return  res.send(error)
        res.send('logout')
        
    })
})

router.get('/current', passportCall('jwt'), authorization('admin'),(req, res) => {
    console.log(req.user)
    res.send({status: 'success', payload: req.user})
})



module.exports = router


