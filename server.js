const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data');
const fs = require('fs');

function petrolScrape(){
    const url = 'https://www.ndtv.com/fuel-prices/petrol-price-in-india';
    axios.get(url)
        .then(response => {
            const html = response.data;
            let fetch_date = '';
            const $ = cheerio.load(html);
               // Find and log span elements that contain "Updated"
               $("span").each((index, element) => {
                const text = $(element).text().trim();
                if (text.includes('Updated')) {
                    // console.log(text.replaceAll('Updated:', ''));
                    fetch_date = text.replaceAll('Updated:', '');
                }
            });
            let tableArray = [];
            $("table tr").each(function(index, elm) {
                let rowData = {
                    city: '',
                    price: '',
                    change: '',
                    fuel_type: 'petrol',
                    fetch_date: fetch_date
                };
                $(elm).find('td').each(function(tdIndex, tdElm) {
                    if (tdIndex === 0) {
                        rowData.city = $(tdElm).text().trim();
                    } else if (tdIndex === 1) {
                        rowData.price = $(tdElm).text().trim().replace('₹/L', '').trim();
                    } else if (tdIndex === 2) {
                        rowData.change = $(tdElm).text().trim();
                    }
                });
                // Check if the rowData object is not empty
                if (rowData.city || rowData.price || rowData.change) {
                    tableArray.push(rowData);
                }
            });
    
            console.log(tableArray);
        })
        .catch(error => {
            console.error('Error fetching the URL:', error);
        });
}


function dieselScrape(){
    const url = 'https://www.ndtv.com/fuel-prices/diesel-price-in-india';
    axios.get(url)
        .then(response => {
            const html = response.data;
            let fetch_date = '';
            const $ = cheerio.load(html);
               // Find and log span elements that contain "Updated"
               $("span").each((index, element) => {
                const text = $(element).text().trim();
                if (text.includes('Updated')) {
                    // console.log(text.replaceAll('Updated:', ''));
                    fetch_date = text.replaceAll('Updated:', '');
                }
            });
            let tableArray = [];
            $("table tr").each(function(index, elm) {
                let rowData = {
                    city: '',
                    price: '',
                    change: '',
                    fuel_type: 'diesel',
                    fetch_date: fetch_date
                };
                $(elm).find('td').each(function(tdIndex, tdElm) {
                    if (tdIndex === 0) {
                        rowData.city = $(tdElm).text().trim();
                    } else if (tdIndex === 1) {
                        rowData.price = $(tdElm).text().trim().replace('₹/L', '').trim();
                    } else if (tdIndex === 2) {
                        rowData.change = $(tdElm).text().trim();
                    }
                });
                // Check if the rowData object is not empty
                if (rowData.city || rowData.price || rowData.change) {
                    tableArray.push(rowData);
                }
            });
    
            console.log(tableArray.length);
        })
        .catch(error => {
            console.error('Error fetching the URL:', error);
        });
}


// dieselScrape()
const limit = 10;
const finalLimit = 696; // This is the final limit of the API
let responseDataArray = [];

function cngScrape(currentLimit) {
    let data = new FormData();
    data.append('limit', currentLimit.toString());

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://www.autox.com/indian-cng-cities-loadmore-ajax/',
        headers: { 
            ...data.getHeaders()
        },
        data: data
    };

    return axios.request(config)
        .then((response) => {
            responseDataArray.push(response.data);

            // Check if we need to make another call
            if (currentLimit < finalLimit) {
                return cngScrape(currentLimit + 10);
            }
        });
}

// Function to save all responses to a single HTML file
function saveResponsesToFile() {
    const filename = 'all_responses.html';
    const fileContent = responseDataArray.join('\n\n'); // Join all responses with two new lines

    fs.writeFile(filename, fileContent, (err) => {
        if (err) throw err;
        console.log(`Saved all responses to ${filename}`);
    });
}

// Start scraping with initial limit
cngScrape(limit)
    .then(() => {
        saveResponsesToFile();
    })
    .catch((error) => {
        console.error(error);
    });