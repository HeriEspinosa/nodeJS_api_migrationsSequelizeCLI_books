const xss = require('xss-clean');
const hpp = require('hpp');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const morgan = require('morgan');

const app = express();
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in one hour! 🙏',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(hpp());

app.use('/api/v1/', limiter);

// app.use('/api/v1/users');
// app.use('/api/v1/authors');
// app.use('/api/v1/books');

app.all('*', (req, res) => {
  return res.status(404).json({
    status: 'error',
    message: `Can't find ${req.originalUrl} on this server! ❌`,
  });
});

module.exports = app;
