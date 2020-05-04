const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const redisStore = require('./config/redis')(session);
const responseFormat = require('./utils/responseFormat');
// const sessionSecret = require('./config/session').secret;
const routes = require('./routes');
const app = express();
app.use(logger('dev'));
// app.use(
// 	session({
// 		resave: false,
// 		saveUninitialized: false,
// 		// secret: sessionSecret,
// 		// store: redisStore,
// 		cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
// 	})
// );
// app.use(cookieParser('secret'));
app.use(bodyParser.json());
app.use(responseFormat);
app.use('/api', routes);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
