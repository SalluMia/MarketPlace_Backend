// app.js (or index.js)

const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const cors=require('cors')

require('./db/dbcon');

app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

// Route for users
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.use(errorHandler);

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on PORT ${process.env.PORT || 5001}`);
});
