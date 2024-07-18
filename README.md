# Petrol Price Scraper

This project is a simple Node.js script to scrape petrol prices from the NDTV website. It fetches the latest petrol prices for various cities in India and displays the data in a structured format.

## Features

- Fetches the latest petrol prices for cities in India.
- Extracts the data from the HTML using `cheerio`.
- Logs the petrol prices along with the city names and price changes.
- Includes the fetch date to keep track of when the data was retrieved.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/petrol-price-scraper.git
    cd petrol-price-scraper
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

## Usage

1. Run the script:

    ```sh
    node script.js
    ```

2. The script will fetch the latest petrol prices from the NDTV website and log the data in the console.

## Code Explanation

- The script uses `axios` to perform an HTTP GET request to fetch the HTML content of the NDTV petrol prices page.
- `cheerio` is used to parse and traverse the HTML, extracting the relevant data.
- The script finds the date of the last update by searching for a `span` element that contains the text "Updated".
- It then iterates over the table rows to extract the city names, petrol prices, and price changes.
- The data is logged in a structured format, including the city, price, change, fuel type, and fetch date.

## Example Output

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
