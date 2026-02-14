const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

const app = express();

app.use(express.json());
const corsOptions = {
    origin: ['https://advocacia-diego-tawny.vercel.app', 'https://www.advogadodiegothales.com.br', 'http://localhost:5552'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('🚀 Backend da Advocacia tá ON!');
});

module.exports = app;