const { configObject } = require("../config");

const { persistence } = configObject
let UsersDao
let ProductsDao
let CartsDao
let SessionsDao
let TicketsDao

switch (persistence) { 
    case 'MEMORY':
        const UsersDaoMemory = require('./MONGO/users.dao')
        UsersDao = UsersDaoMemory

        const ProductDaoMemory = require('./MONGO/products.dao')
        ProductsDao = ProductDaoMemory

        const sessionsDaoMemory = require('./MONGO/sessions.dao')
        SessionsDao = sessionsDaoMemory

        const CartsDaoMemory = require('./MONGO/carts.dao')
        CartsDao = CartsDaoMemory

        const TicketsDaoMemory = require('./MONGO/tickets.dao')
        TicketsDao = TicketsDaoMemory
       
    case 'FS':
        const UsersDaoFS = require('./MONGO/users.dao')
        UsersDao = UsersDaoFS

        const ProductDaoFS = require('./MONGO/products.dao')
        ProductsDao = ProductDaoFS

        const sessionsDaoFS = require('./MONGO/sessions.dao')
        SessionsDao = sessionsDaoFS

        const CartsDaoFS = require('./MONGO/carts.dao')
        CartsDao = CartsDaoFS

        const TicketsDaoFS = require('./MONGO/tickets.dao')
        TicketsDao = TicketsDaoFS
        
        break;
   
    default:
        const UsersDaoMongo = require('./MONGO/users.dao')
        UsersDao = UsersDaoMongo

        const ProductDaoMongo = require('./MONGO/products.dao')
        ProductsDao = ProductDaoMongo

        const sessionsDaoMongo = require('./MONGO/sessions.dao')
        SessionsDao = sessionsDaoMongo

        const CartsDaoMongo = require('./MONGO/carts.dao')
        CartsDao = CartsDaoMongo

        const TicketsDaoMongo = require('./MONGO/tickets.dao')
        TicketsDao = TicketsDaoMongo

        break;
}

// daos/factory.js
module.exports = {
    UsersDao,
    ProductsDao,
    CartsDao,
    TicketsDao
  };