const apiKey = '2a987997a40fac0d8c0393a7e8b512c7';
const geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBlXPeo2SLOD321iw-9cagV1a-raHXwNHM';
let currentPage = 1;
const rowsPerPage = 10;
let weatherData = [];

// Chat button click event
document.getElementById('chat-button').addEventListener('click', async () => {
    const query = document.getElementById('chat-input').value.trim();

    // Check if the query is empty
    if (!query) {
        alert("Please enter a query.");
        return;
    }

    // Check for weather-related queries
    if (query.toLowerCase().includes('weather') || query.toLowerCase().includes('temperature')) {
        const city = extractCityFromQuery(query);
        console.log(city);
        const weatherData = await getWeatherData(city);
        console.log(weatherData);
        if (weatherData) {
            displayWeatherInChat(weatherData, city);
        } else {
            displayInChat("Sorry, I couldn't find the weather information for that city.");
        }
    } else {
        const response = await getGeminiResponse(query);
        displayInChat(response);
    }
});

// Function to fetch response from the Gemini API
const getGeminiResponse = async (query) => {
    console.log(JSON.stringify({contents:[{parts:[{text: query}]}]}));
    try {
        const response = await fetch(geminiApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({contents:[{parts:[{text: query}]}]})
        });

        // Handle non-200 responses
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.candidates[0]?.content?.parts[0]?.text;
    } catch (error) {
        console.error('Error fetching response:', error);
        return "Sorry, there was an error getting a response. Please try again later.";
    }
};

// Extract city from query
const extractCityFromQuery = (query) => {
    const words = query.split(' ');
    return words[words.length - 1];
};

// Display weather data in chat
const displayWeatherInChat = (weatherData, city) => {
    
    const temps = weatherData.list.slice(0, 5).map(item => item.main.temp);
    const weatherConditions = weatherData.list.slice(0, 5).map(item => item.weather[0].main);

    const chatOutput = document.getElementById('chat-output');
    const weatherInfo = `
        Weather for ${city} for past 5 days:
        Temperature: ${temps} °C
        Conditions: ${weatherConditions}
    `;
    chatOutput.innerHTML += `<p>${weatherInfo}</p>`;
};

// Display generic responses in chat
const displayInChat = (response) => {
    console.log(response);
    const chatOutput = document.getElementById('chat-output');
    chatOutput.innerHTML += `<p>${response}</p>`;
};

// Fetch weather data based on the city name
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

// Function to get weather data for the table
const getWeatherDataForTable = async (city) => {
    const data = await getWeatherData(city);
    if (!data) return;

    weatherData = data.list.map(item => ({
        date: item.dt_txt.split(' ')[0],
        temp: item.main.temp.toFixed(1),
        weather: item.weather[0].main
    }));

    paginate(weatherData);  // Paginate table data
    setupPagination(weatherData); // Setup pagination controls
};

// Event listener for city search
document.getElementById('search-button').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        await getWeatherDataForTable(city); 
    } else {
        alert("Please enter a city name.");
    }
});

// Display table with weather data
const displayTable = (data) => {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    data.forEach((row) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.date}</td><td>${row.temp} °C</td><td>${row.weather}</td>`;
        tableBody.appendChild(tr);
    });
};

// Setup pagination for table data
const setupPagination = (data) => {
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = '';

    const totalPages = Math.ceil(data.length / rowsPerPage);

    for (let page = 1; page <= totalPages; page++) {
        const button = document.createElement('button');
        button.innerText = page;
        button.addEventListener('click', () => {
            currentPage = page;
            paginate(data);
        });
        paginationControls.appendChild(button);
    }
};

// Paginate weather data for the table
const paginate = (data) => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = data.slice(start, end);
    displayTable(paginatedData);
};
