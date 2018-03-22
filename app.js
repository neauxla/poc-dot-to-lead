// Require Scripts
let app = require('express')();
let ejs = require('ejs');
let nforce = require('nforce');
let DOTService = require('./services/CompanyData');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

console.log('Hellerrrr');