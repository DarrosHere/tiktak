require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static('uploads'));
app.use('/auth', require('./routes/auth'));
app.use('/videos', require('./routes/videos'));

app.listen(5000, () => console.log('Server started on port 5000'));