//dependencies
const express = require('express');
const app = express();
const port = 3000;
const Product = require('./models/products.js');
const mongoose = require('mongoose')
const methodOverride = require('method-override')



//middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}));
app.set('view engine','jsx')
app.engine('jsx',require('express-react-views').createEngine());
app.use(express.static('public')); //not used in this particular exercise,but almost always part of the middleware
app.use(methodOverride('_method'));


//mongoose Connection
mongoose.connect('mongodb://localhost:27017/basiccrud',{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open',()=>{
    console.log("connected to mongo");
})

const tracksController = require('./controllers/fruits.js');
app.use('/tracklist',tracksController);

//listen
app.listen(port,()=>{
    console.log('The Marvelous Muscial Automat is listening on Port',port);
})