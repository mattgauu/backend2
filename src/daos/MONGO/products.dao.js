const { productModel } = require("./models/products.model");

class ProductDaoMongo {
    constructor() {
        this.model = productModel;
    }

    get = async () => await this.model.find();

    create = async (newProduct) => await this.model.create(newProduct);

    getBy = async (filterObject) => await this.model.findOne(filterObject);

    update = async (pid, productToUpdate) =>
        await this.model.findByIdAndUpdate({ _id: pid }, productToUpdate, { new: true });

    delete = async (pid) =>
        await this.model.findByIdAndDelete({ _id: pid });
}

module.exports = ProductDaoMongo;
