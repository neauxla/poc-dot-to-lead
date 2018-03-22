// Load packages
let request = require('request');
let cheerio = require('cheerio');

// Define function to retrieve company data from website
var getCompanyDataByDOTNumber = function(dotNumber, callback) {
    // Create new request
    request.post(
        {
            url: 'https://safer.fmcsa.dot.gov/query.asp', 
            form: {
                searchtype: 'ANY',
                query_type: 'queryCarrierSnapshot',
                query_param: 'USDOT',
                query_string: dotNumber
            }
        }, 
        function(err, response, body) {
            if(err) {
                console.log(err, response);
                callback(err, null);
            } else {
                const result = parseCompanyInformationFromBody(body);
                callback(null, result);
            }
        });
}

// Define method to extract company data from html
var parseCompanyInformationFromBody = function(htmlBody) {
    // Check input
    if(typeof htmlBody !== 'string') {
        htmlBody = htmlBody.toString();
    }

    // Parse
    const $ = cheerio.load(htmlBody);

    // Iterate all values
    var result = {};
    $('th.querylabelbkg').each(function(i) {
        // Get value names
        try {
            // Get hash value in href of child element
            var key = $(this).children('a').attr('href').split('#')[1];
            if(key) {
                // Set key, get value from the next sibling
                result[key] = $(this).next('.queryfield').text().trim();
            }
        } catch(exc) {

        }        
    })
    
    // Done
    return result;
}

module.exports = {
    getCompanyByDOTNumber: getCompanyDataByDOTNumber
}