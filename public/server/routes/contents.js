var express = require("express");
var router = express.Router();

const { getContents, createContent, updateContent, getContent, deleteContent } = require('../controller/contents')

router.get('/', getContents)
router.post('/', createContent)
router.get('/:contentID', getContent)
router.patch('/:contentID', updateContent)
router.delete('/:contentID', deleteContent)

module.exports = router