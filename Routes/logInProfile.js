const loginProfile = require('../Middleware/logInProfileMiddleware')

const router = require('express').Router()

router.get('/', loginProfile, (req, res) => {
    res.status(200).json({ profile: req.profile })
})

module.exports = router