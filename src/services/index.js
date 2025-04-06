const { 
  UsersDao, 
  ProductsDao, 
  SessionsDao, 
  CartsDao, 
 
} = require("../daos/factory");

const ProductRepository = require("../repositories/products.repository");
const { UserRepository } = require("../repositories/users.repository");
const CartRepository = require("../repositories/carts.repository");

// Los DAOs ya son instancias, no necesitan 'new'
const UsersService = new UserRepository(UsersDao);
const ProductsService = new ProductRepository(ProductsDao);
const CartsService = new CartRepository(CartsDao);


module.exports = {
  userService: UsersService,
  productService: ProductsService, // 👈 Este nombre sí lo vas a usar en tu controller
  cartService: CartsService,
};