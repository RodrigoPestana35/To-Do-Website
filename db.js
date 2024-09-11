require('dotenv').config();
const mongoose = require('mongoose');
const mongoURL = process.env.mongoDB_URL;

// Conectar à base de dados
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('MongoDB conectado');
        }).catch((err) => {
            console.error('Erro ao conectar à base de dados', err);
            process.exit(1);
        });
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Erro ao conectar à base de dados', error);
        process.exit(1);
    }
}

module.exports = connectDB;