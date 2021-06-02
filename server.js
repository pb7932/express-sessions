const express = require('express');
const app = express();
const path = require('path');

const indexRouter = require('./routes/index.routes');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const {sessionManager} = require('./sessions/sessionManager');
app.use(sessionManager);

app.use('/', indexRouter);
app.listen(3000);