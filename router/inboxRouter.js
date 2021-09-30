//external imports
const express = require('express')

//internal imports
const { getInbox } = require('../controllers/inboxController')
const {checkLogin} = require('../middlewares/common/checkLogin')
const decoratedHtmlResponse = require('../middlewares/common/decoratedHtmlResponse')

const router = express.Router()

//inbox page
router.get('/', decoratedHtmlResponse('Inbox'), checkLogin ,getInbox)

module.exports = router