const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
console.log(process.env.PORT)

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://ksamavati:1234@cluster0.gvg7nvw.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// if this is running on live server (Heroku)
// if (process.env.NODE_ENV === "production") {
// app.get('/', (req, res) => {
// 	// res.send(__dirname);
// 	res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
// })
// }

// app.get('/', function (req, res) {
// 	res.sendFile(path.join(__dirname, '/../build/index.html'));
// });
// app.use(express.static(path.join(__dirname, '../build/index.html')))
// app.use('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, '/../build/index.html'))
// })
//  express.static(__dirname + '/../build/index.html'));
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use(express.static(path.join(__dirname, '../build')));

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});