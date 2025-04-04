const jwt = require ('jsonwebtoken');
const { PRIVATE_KEY } = require ('../utils/authToken.js');

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    const token = authHeader.split(' ')[1]

    jwt.verify(token, PRIVATE_KEY, (error, userDataDecode) => {
        if (error) {
            return res.status(401).send({ status: 'error', message: 'Unauthorized' });
        }
        req.user = userDataDecode
        next();
    })

    
}
function authentication(req, res, next) {
    console.log(req.session.email, req.session.admin)
    if(req.session.user.email !== 'f@gmail.com' || !req.session.user.isAdmin ) {
        return res.send('error de autenticación ')
    }
    next()
}
// middleware/auth.middlewares.js
const authorization = (requiredRoles) => {
    return async (req, res, next) => {
      if (!req.user) return res.status(401).send({ error: 'Unauthorized' });
      
      if (!requiredRoles.includes(req.user.role)) {
        return res.status(403).send({ error: 'Insufficient permissions' });
      }
      
      next();
    };
  };
  
  const canManageProducts = authorization(['admin']);
  const canManageCart = authorization(['user', 'admin']);
  
  module.exports = {
    authorization,
    canManageProducts,
    canManageCart
  };

