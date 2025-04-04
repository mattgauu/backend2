const { connect } = require('mongoose');

class MongoSingleton {
    static #instance
    constructor(uri) {
    }
    static getInstance(uri) {
        if (this.#instance) {
            console.log('Ya existe una instancia de MongoSingleton');
            return this.#instance;
        }
        this.#instance = new MongoSingleton();
        console.log('base de datos conectada')
        return this.#instance
    }

}
module.exports = {
    MongoSingleton
};