// Fetch and process Pinduoduo's stock price data for the past six months and display it using a charting library

async function fetchStockData() {
    // Using a mock API URL for demonstration purposes
    const API_URL = 'mock-api.json';
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch stock data:', error);
        return null;
    }
}

function processStockData(stockData) {
    // Assuming stockData is an array of { date: 'YYYY-MM-DD', price: Number }
    // Filter data to the last six months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    return stockData.filter(data => new Date(data.date) >= sixMonthsAgo);
}

async function displayStockTrend() {
    const stockData = await fetchStockData();
    if (!stockData) {
        console.error('No stock data available');
        return;
    }

    const processedData = processStockData(stockData);
    // Use Chart.js to display the data
    const ctx = document.getElementById('stock-trend-graph').getContext('2d');
    const stockTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: processedData.map(data => data.date),
            datasets: [{
                label: 'Stock Price',
                data: processedData.map(data => data.price),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

displayStockTrend();
