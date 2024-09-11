require('dotenv').config();
const mongoose = require('mongoose');
const mongoURL = process.env.mongoDB_URL;

// Conectar à base de dados
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Erro ao conectar à base de dados', error);
        process.exit(1);
    }
}

module.exports = connectDB;