require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/vacancies', require('./routes/vacancies'));
app.use('/api/applications', require('./routes/applications'));

app.listen(3000, () => console.log('Server running on port 3000'));