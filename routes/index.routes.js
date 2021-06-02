const express = require('express');
const router = express.Router();

let global_counter = 0;

router.get('/', (req, res, next) => {
    global_counter++;

    res.render('index', {global_counter: global_counter});
});

module.exports = router;