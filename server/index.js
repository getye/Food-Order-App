const express = require('express');
const cors = require('cors');
const session = require('express-session');
const userRouter = require('./routes/userRouter');
const roleRouter = require('./routes/roleRouter');
require('dotenv').config();
const path = require('path');
const menuRouter = require('./routes/MenuRoute');

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
  origin: 'http://localhost:3000', // Change this to your React app's URL
  credentials: true
}));

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use('/', userRouter);
app.use('/', roleRouter);
app.use('/', menuRouter);


const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
