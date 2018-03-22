let nforce = require('nforce');
var org = nforce.createConnection({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.BASE_URL + '/oauth/_callback',
    apiVersion: 'v41.0',  // optional, defaults to current salesforce API version
    environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
    mode: 'single' // optional, 'single' or 'multi' user mode, multi default
});


module.exports = {
    createLead: function(companyData, callback) {
        org.authenticate({ username: process.env.USERNAME, password: process.env.PASSWORD}, function(err, resp) {
        // the oauth object was stored in the connection object
            if(!err) console.log('Cached Token: ' + org.oauth.access_token)
        });

        // Make lead
        var acc = nforce.createSObject('Lead');
        acc.set('Name', companyData.Carrier);
        acc.set('Phone', companyData.Phone);

        org.insert({ sobject: acc, oauth: org.oauth }, callback);
    }
}