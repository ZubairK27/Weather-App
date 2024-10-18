const apiKey = '2a987997a40fac0d8c0393a7e8b512c7';
let barChart, doughnutChart, lineChart;

// Function to fetch weather data based on the city name
const getWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            alert("City not found. Please try again.");
            return null;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert("An error occurred while fetching the data.");
        return null;
    }
};

// Event listener for city search
document.getElementById('search-button').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        const data = await getWeatherData(city);
        if (data) {
            updateUI(data); // Update UI if data is successfully fetched
        }
    } else {
        alert("Please enter a city name.");
    }
});

// Function to update the UI and charts
const updateUI = (data) => {
    const labels = data.list.slice(0, 5).map(item => item.dt_txt);
    const temps = data.list.slice(0, 5).map(item => item.main.temp);
    const weatherConditions = data.list.slice(0, 5).map(item => item.weather[0].main);

    console.log(labels, temps, weatherConditions);
    setWeatherWidgetBackground(weatherConditions[0]);
    destroyCharts();
    updateCharts(labels, temps, weatherConditions);
};

// Function to destroy existing charts
const destroyCharts = () => {
    if (barChart) barChart.destroy();
    if (doughnutChart) doughnutChart.destroy();
    if (lineChart) lineChart.destroy();
};

// Update the charts with the new data
const updateCharts = (labels, temps, weatherConditions) => {
    const ctxBar = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temps,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctxDoughnut = document.getElementById('doughnutChart').getContext('2d');
    const weatherCount = {};

    weatherConditions.forEach(condition => {
        weatherCount[condition] = (weatherCount[condition] || 0) + 1;
    });

    doughnutChart = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: Object.keys(weatherCount),
            datasets: [{
                data: Object.values(weatherCount),
                backgroundColor: ['red', 'blue', 'yellow', 'green']
            }]
        }
    });

    const ctxLine = document.getElementById('lineChart').getContext('2d');
    lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temps,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
    });
};

const setWeatherWidgetBackground = (condition) => {
    const widget = document.getElementById('weather-widget');
    switch (condition.toLowerCase()) {
        case 'clear':
            widget.style.backgroundImage = "url('./clear.jpg')";
            break;
        case 'clouds':
            widget.style.backgroundImage = "url('./cloudy.jpg')";
            break;
        case 'rain':
            widget.style.backgroundImage = "url('./rain.jpg')";
            break;
        default:
            widget.style.backgroundColor = 'lightwhite';
    }
};
