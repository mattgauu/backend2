const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { userModel } = require('../daos/MONGO/models/user.model.js');
const { PRIVATE_KEY } = require('../utils/authToken.js');

const initializePassport = () => {
    
    const options = {
        jwtFromRequest: ExtractJwt.fromExtractors([
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            (req) => {
                let token = null;
                if (req && req.cookies) {
                    token = req.cookies['coderCookieToken']; 
                }
                return token;
            },
        ]),
        secretOrKey: PRIVATE_KEY,
    };

    
    passport.use(
        new JwtStrategy(options, async (jwt_payload, done) => {
            try {
                const user = await userModel.findById(jwt_payload.id); 
                if (!user) {
                    return done(null, false); 
                }
                return done(null, user); 
            } catch (error) {
                return done(error, false); 
            }
        })
    );
};

module.exports = { initializePassport };