const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB connection established');
});

app.get('/', (req, res) => {
	res.json({ message: 'test' });
});

const userRouter = require('./routes/user.route');

app.use('/user', userRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
