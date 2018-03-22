var nforce = require('nforce');



module.exports = {
    createLead: function(companyData, callback) {
        var org = nforce.createConnection({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            redirectUri: process.env.BASE_URL + '/oauth/_callback',
            apiVersion: 'v41.0',  // optional, defaults to current salesforce API version
            environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
            mode: 'single' // optional, 'single' or 'multi' user mode, multi default
        }); 
        org.authenticate({ username: process.env.USERNAME, password: process.env.PASSWORD}, function(err, resp) {
        // the oauth object was stored in the connection object
            if(!err) console.log('Cached Token: ' + org.oauth.access_token)
            // Make lead
            var acc = nforce.createSObject('Lead');
            acc.set('LastName', companyData.Carrier);
            acc.set('Company', companyData.Carrier);
            acc.set('Status', 'Open - Not Contacted');
            acc.set('Phone', companyData.Phone);

            org.insert({ sobject: acc, oauth: resp }, callback);
        });

        
    }
}