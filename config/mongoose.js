const mongoose = require('mongoose');

// connecting mongoose to its default server and ecommerceDB
mongoose.connect('mongodb+srv://ajaysingh493:C53yjrk0Pt5wrd11@ecommerceapi.rwgjmca.mongodb.net/E-commerce?retryWrites=true&w=majority&appName=EcommerceAPI');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;