const router = require('express').Router()
const {getUsers,
    createUser,
    updateUser,
    deleteUser,
    findUser,
    findUserByAccountNumber,
    findUserByIdentityNumber
} = require('../controllers/users');

router.get('/',getUsers)
router.get('/account-number/:accountNumber',findUserByAccountNumber)
router.get('/identity-number/:identityNumber',findUserByIdentityNumber)
router.post('/',createUser)
router.put('/:Id',updateUser)
router.delete('/:Id',deleteUser)
module.exports = router