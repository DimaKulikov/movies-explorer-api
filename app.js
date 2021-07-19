const express = require('express');
const mongoose = require('mongoose');
const fakeUser = require('./middlewares/fakeUser');

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

// Middlewares
app.use(express.json());
app.use(fakeUser);

// Routes
app.use(require('./routes'));

// Server
app.listen(4000, () => console.log('server started on 4000'));
