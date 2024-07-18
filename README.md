# Fuel Price Scraper

This project is a Node.js script to scrape fuel prices (petrol, diesel, and CNG) from various websites. It fetches the latest prices for various cities in India and saves the data in a structured format.

## Features

- Fetches the latest petrol and diesel prices for cities in India.
- Fetches CNG prices from multiple API calls.
- Extracts the data from the HTML using `cheerio`.
- Saves the fetched data into a file for later analysis.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/surajvsk/fuel-price-scraper.git
    cd fuel-price-scraper
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

## Usage

### Petrol Price Scraping

1. Run the script to scrape petrol prices:

    ```sh
    node server.js
    ```

2. The script will fetch the latest petrol prices from the NDTV website and log the data in the console.

### Diesel Price Scraping

1. Run the script to scrape diesel prices:

    ```sh
    node server.js
    ```

2. The script will fetch the latest diesel prices from the NDTV website and log the data in the console.

### CNG Price Scraping

1. Run the script to scrape CNG prices:

    ```sh
    node server.js
    ```

2. The script will make multiple API calls to fetch the latest CNG prices and save the responses to an HTML file.

## Code Explanation

### Petrol Price Scraping

- The script uses `axios` to perform an HTTP GET request to fetch the HTML content of the NDTV petrol prices page.
- `cheerio` is used to parse and traverse the HTML, extracting the relevant data.
- The script finds the date of the last update by searching for a `span` element that contains the text "Updated".
- It then iterates over the table rows to extract the city names, petrol prices, and price changes.
- The data is logged in a structured format, including the city, price, change, fuel type, and fetch date.

### Diesel Price Scraping

- Similar to the petrol price scraping function, this script uses `axios` and `cheerio` to fetch and parse the HTML content of the NDTV diesel prices page.
- It extracts the city names, diesel prices, and price changes from the table rows.
- The data is logged in a structured format, including the city, price, change, fuel type, and fetch date.

### CNG Price Scraping

- The script uses `axios` to make a POST request to the CNG prices API with a `limit` parameter.
- It makes multiple API calls until the `finalLimit` is reached, fetching all the CNG prices data.
- The responses are saved to a single HTML file for later analysis.

## Example Output

### Petrol and Diesel Price Output

```json
[
    {
        "city": "Delhi",
        "price": "95.41",
        "change": "+0.23",
        "fuel_type": "petrol",
        "fetch_date": "18 July 2024"
    },
    {
        "city": "Mumbai",
        "price": "105.27",
        "change": "+0.20",
        "fuel_type": "petrol",
        "fetch_date": "18 July 2024"
    }
    // ... more data
]
