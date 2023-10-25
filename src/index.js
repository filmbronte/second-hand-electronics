const PORT = 3000;
const path = require('path');

const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { auth } = require('./middlewares/authMiddleware');

const router = require('./routes');

//Change db name!!!!!!
const uri = "mongodb://127.0.0.1:27017/second-hand-electronics";

const app = express();

mongoose.connect(uri)
    .then(() => console.log('DB connected successfully!'))
    .catch(err => console.log(`DB error`, err.message));


app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(express.static(path.resolve(__dirname,'public')));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(auth);
app.use(router);

app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));