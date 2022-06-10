var express = require("express");
var router = express.Router();

const { getUsers, createUser, getUserbyID, getUserbyEmail, updateUser } = require('../controller/users')

router.post('/', createUser)
router.get('/', getUsers)
router.get('/:_id', getUserbyID)
router.get('/:email', getUserbyEmail)
router.patch('/:_id', updateUser)

module.exports = router