const { Router } = require('express')
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../utils/authToken')

class RouterClass {
    constructor(){
        this.router = Router()
        this.init()
    }
    
    getRouter(){
        return this.router
    }
    
    init(){}

    // ejecutas todos los callbacks 
    applyCallbacks(callbacks){
        return callbacks.map(callback => async (...params) => { // [(0)req, (1)res]
            try {
                await callback.apply(this, params)
            } catch (error) {
                console.log(error)
                params[1].status(500).send(error)
            }
        })

    }

    // crear un metodo que funciona como middleware
    generateCustomResponses = (req, res, next) => {
        res.sendSuccess     = payload => res.send({status: 'success', payload}) 
        res.sendServerError = error => res.status(500).send({status: 'error', error}) 
        res.sendUserError   = error => res.status(400).send({status: 'error', error}) 
        next()
    }

     // role Público 'admin' -> ['PUBLIC','user-preimun', 'admin']
    handlePolicies = policies =>  (req, res, next) => {
        if(policies[0] === 'PUBLIC') return next()
        // dos formas headers 'Bearer aldsfjtoken' _ cookie
        const authHeader = req.headers.atuhorization
        if (!authHeader) return res.status(401).send({status:'success',error: 'Unauthorization'}) 
        const token = authHeader.split(' ')[1]
        let user = jwt.verify(token, PRIVATE_KEY)
        if(!policies.includes(user.role.toUpperCase())) return res.status(403).send({status:'success',error: 'No Permissions'}) 
        req.user = user
        next()
    }
    
    get(path, policies,...callbacks){
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    } ///[cb1, cb2,.....].map(cb => fn)
    
    post(path, policies,...callbacks){
        this.router.post(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }
    put(path, policies,...callbacks){
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    } ///[cb1, cb2,.....].map(cb => fn)
    
    delete(path, policies,...callbacks){
        this.router.post(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

   
   
}

module.exports = {
    RouterClass
}

/// RouterClass -> UserRouter - PrductRouter