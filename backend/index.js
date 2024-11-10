const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
require('dotenv').config()
const port = process.env.PORT || 4000;

connectToMongo();
const app = express();

app.use(cors());
app.use(express.json());

//Avilable routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`todoapp Backend listening at http://localhost:${port}`)
})