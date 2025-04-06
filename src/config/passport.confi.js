const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { userModel } = require('../daos/MONGO/models/user.model.js');
const { PRIVATE_KEY } = require('../utils/authToken.js');

const initializePassport = () => {
    // Configuración de las opciones para JwtStrategy
    const options = {
        jwtFromRequest: ExtractJwt.fromExtractors([
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            (req) => {
                let token = null;
                if (req && req.cookies) {
                    token = req.cookies['coderCookieToken']; // Extrae el token de la cookie
                }
                return token;
            },
        ]),
        secretOrKey: PRIVATE_KEY, // Usa la clave privada para verificar el token
    };

    // Configura la estrategia JWT
    passport.use(
        new JwtStrategy(options, async (jwt_payload, done) => {
            try {
                const user = await userModel.findById(jwt_payload.id); // Busca el usuario en la base de datos
                if (!user) {
                    return done(null, false); // Usuario no encontrado
                }
                return done(null, user); // Usuario encontrado
            } catch (error) {
                return done(error, false); // Error en la búsqueda
            }
        })
    );
};

module.exports = { initializePassport };