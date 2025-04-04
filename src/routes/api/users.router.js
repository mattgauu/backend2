const { Router } = require('express')
const { UserController } = require('../../controllers/users.controller')

const router = Router()
const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = new UserController()

router.post('/', createUser)
router.get('/', getUsers)
router.get('/:uid', getUser)
router.put('/:uid', updateUser)
router.delete('/:uid', deleteUser)


module.exports = router