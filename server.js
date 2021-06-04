const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const {sessionManager} = require('./sessions/sessionManager');

const indexRouter = require('./routes/index.routes');
//const cookieRouter = require('./routes/cookie.routes');
//const pageRouter = require('./routes/page.routes');

app.use(cookieParser());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(sessionManager);

app.use('/', indexRouter);
//app.use('/cookies', cookieRouter);
//app.use('/', pageRouter);

app.listen(3000);