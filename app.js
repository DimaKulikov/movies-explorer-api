const express = require('express');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

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
// app.use(fakeUser);

// Auth
// app.use(auth);

// Routes
app.use(require('./routes/index.routes'));

// Error logger
app.use(errorLogger);

// Error handler
app.use(errorHandler);

// Server
app.listen(4000, () => console.log('server started on 4000'));
