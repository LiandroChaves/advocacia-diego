const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('🚀 Backend da Advocacia tá ON!');
});

module.exports = app;