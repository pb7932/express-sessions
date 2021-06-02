const express = require('express');
const router = express.Router();

let global_counter = 0;

router.get('/', (req, res, next) => {
    if(req.session.counter == undefined) {
        req.session.counter = 0;
    }

    res.render('index', 
            {global_counter: ++global_counter, 
            counter: ++req.session.counter,
            sessionId: req.session.id});
});

module.exports = router;