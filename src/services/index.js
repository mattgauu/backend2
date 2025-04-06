const { 
  UsersDao, 
  ProductsDao, 
  SessionsDao, 
  CartsDao,
  TicketsDao
} = require("../daos/factory");

const ProductRepository = require("../repositories/products.repository");
const { UserRepository } = require("../repositories/users.repository");
const CartRepository = require("../repositories/carts.repository");
const TicketRepository = require("../repositories/ticket.repository");

const UsersService = new UserRepository(UsersDao);
const ProductsService = new ProductRepository(ProductsDao);
const CartsService = new CartRepository(CartsDao);
const TicketsService = new TicketRepository(TicketsDao); // 👈 importante

module.exports = {
  userService: UsersService,
  productService: ProductsService,
  cartService: CartsService,
  ticketService: TicketsService, // 👈 esto también, aunque el archivo se llame `tickets`, el servicio sigue siendo `ticketService`
};
