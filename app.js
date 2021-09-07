const express = require('express');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/users.routes');
const moviesRouter = require('./routes/movies.routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

// Middlewares
app.use(requestLogger);
app.use(express.json());

// Routing
app.use('/api', authRouter);
app.use(auth);
app.use('/api/users', userRouter);
app.use('/api/movies', moviesRouter);

// Error logger
app.use(errorLogger);

// Error handler
app.use(errorHandler);

// Server
// eslint-disable-next-line no-console
app.listen(4000, () => console.log('server started on 4000'));
