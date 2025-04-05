const express = require( 'express');
const { conectDB, configObject } = require( './config/index.js')
const  sessionsRouter  = require( './routes/api/sessions.router.js')
const  viewsRouter  = require( './routes/views.router.js')
const { initializePassport } = require('./config/passport.confi.js')
const passport = require('passport')
const handlebars = require('express-handlebars')
const logger         = require('morgan')
const cookieParser   = require('cookie-parser')
const session        = require('express-session')
const FileStore      = require('session-file-store')
const MongoStore     = require('connect-mongo')
const usersRouter = require('./routes/api/users.router');
const productsRouter = require('./routes/api/products.router.js');
const cors = require('cors')
const cartsRouter = require('./routes/api/carts.router');






const app = express();
const PORT = configObject.port
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(logger('dev'))
app.use(cookieParser('CoderPalab@S3cret@'))


app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], // Agregá los orígenes desde donde estés testeando el frontend
  credentials: true
}));


app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))

app.set('views', __dirname + '/views')

app.set('view engine', 'hbs')


initializePassport()
app.use(passport.initialize())

conectDB()

app.get('/', (req, res) => {
    res.send('Hola mundo')
})

app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter);
app.use('/api/users', usersRouter)
app.listen(PORT, ()=>{
    console.log(`escuchando server en puerto ${PORT}`)    
})
