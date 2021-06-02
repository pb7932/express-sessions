const express = require('express');
const router = express.Router();

router.get('/*', (req, res, next) =>{
    console.log(req.cookies);
    res.render('cookiePage', {
        cookies: req.cookies,
        path: req.path
    })
})

module.exports = router;