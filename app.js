// Require Scripts
let app = require('express')();
let bodyParser = require('body-parser');
let ejs = require('ejs');
let nforce = require('nforce');
let DOTService = require('./services/CompanyData');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Set body parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Home page routing
app.get('/', function(req, res) {
    res.render('index', {company: null});
})

// Handle search
app.post('/', function(req, res) {
    // Get form input
    const DOT_Number = req.body.DOT_NUMBER;

    // Get company data from service
    DOTService.getCompanyByDOTNumber(DOT_Number, function(err, result) {
        // Check response
        if(err) {
            // respond to error
            return res.send(err);
        } else {
            // Format result resp
            console.log(result);
            return res.render('index', {company: JSON.stringify(result, null, 2)});
        }
    })
})

app.listen(3000, function() {
    console.log('App running on port 3000');
})