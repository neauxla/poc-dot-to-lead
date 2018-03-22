// Require Scripts
let app = require('express')();
let ejs = require('ejs');
let nforce = require('nforce');
let DOTService = require('./services/CompanyData');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Home page routing
app.get('/', function(req, res) {
    res.render('index');
})


app.post('/', function(req, res) {
    
})

app.listen(3000, function() {
    console.log('App running on port 3000');
})