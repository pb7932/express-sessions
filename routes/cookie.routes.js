const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser')
const path = require('path');

router.get('/set', (req, res, next) => {
    if ( ! (req.query.name && req.query.value) ) {
        res.send('Missing mandatoy parameters: name and value');
        return
    }

    if ( ! req.query.path )
        req.query.path='/';

    if( req.query.maxage > 0) {
        res.cookie(req.query.name, req.query.value, { path: req.query.path, maxAge: req.query.maxage });
    }
    else {
        res.cookie(req.query.name, req.query.value, { path: req.query.path });
    }

    res.send("Cookie " + req.query.name + " set to value: " + req.query.value + " on path " +
        req.query.path + " with expiration time of " + req.query.max_age + "s");
})

router.get('/clear', (req, res, next) => {
    if ( ! req.query.name ) {
        res.send('Missing mandatory parameter name');
        return
    }

    if( !req.query.path )
        req.query.path = '/';

    res.clearCookie(req.query.name, { path: req.query.path });
    res.send("Cleared cookie " + req.query.name + " at path " + req.query.path);
})

module.exports = router;