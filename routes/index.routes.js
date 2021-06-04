const express = require('express');
const router = express.Router();
const {urlRewrite} = require('../sessions/sessionManager');

let global_counter = 0;

let handleRequest = function(template) {
    return function (req, res, next) {
        if(req.session.counter == undefined) {
            req.session.counter = 0;
        }
    
        res.render(template, 
                {global_counter: ++global_counter, 
                counter: ++req.session.counter,
                sessionId: req.session.id,
                url: urlRewrite(req.session.id)
            });
    };
};

router.get('/', handleRequest('index'));
router.get('/first', handleRequest('first'));
router.get('/second', handleRequest('second'));

module.exports = router;