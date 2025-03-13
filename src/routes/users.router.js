const { RouterClass } = require("./router.js");
// const { Router } = require('express')


class UserRouter extends RouterClass {
    // en la clase padre tienen el metodo get
    init(){// definir en la clase hijo UserRouter
        this.get('/', ['ADMIN'], (req, res)=>{
            try {
                
                res.sendSuccess([])
            } catch (error) {
                res.sendServerError(error)
            }
        })
        this.post('/', (req, res)=>{
            res.send({message: 'create users'})
        })
    } 
}

module.exports = {
    UserRouter
}

