// Require Scripts
let app = require('express')();
let bodyParser = require('body-parser');
let ejs = require('ejs');
let session = require('express-session');
let DOTService = require('./services/CompanyData');
let SFDCService = require('./services/SalesforceService.js');

// Set app options
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('trust proxy', 1);
app.use(session({
    secret: 'somekey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// Set body parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Home page routing
app.get('/', function(req, res) {
    res.render('index', {company: null});
})

// Handle search
app.post('/', function(req, res) {
    // Determine operation
    console.log(req.body);
    if(req.body.hasOwnProperty('search')) {
        // Do search...
        // Get form input
        const DOT_Number = req.body.DOT_NUMBER;

        // Get company data from service
        DOTService.getCompanyByDOTNumber(DOT_Number, function(err, result) {
            // Check response
            if(err) {
                // respond to error
                return res.send(err);
            } else {
                // Save to session
                req.session.company = result;

                // Format result resp
                console.log(result);
                return res.render('index', {company: JSON.stringify(result, null, 2)});
            }
        })
    } else if(req.body.hasOwnProperty('create')) {
        // Create Lead
        console.log('Save', req.session.company);

        // Call salesforce
        SFDCService.createLead(req.session.company, function(err, result) {
            if(err) {
                // handle error
                res.render('index', {company: null, msg: err});
            } else {
                // Render success
                res.render('index', {company: null, msg: 'Success!', id: null});
            }
        })
        
    } else {
        // Dunno...
        return res.send('Wha?');
    }
    
})

app.listen(process.env.PORT, function() {
    console.log('App running on port:  ' + process.env.PORT);
})