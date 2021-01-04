const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB connection established');
});

const userRouter = require('./routes/user.route');

app.use('/user', userRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
