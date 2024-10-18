Weather App with Gemini Chatbot

This project is a weather application that provides weather forecast data for cities around the world. It includes a dashboard page with weather charts and a tables page with a chatbot feature integrated using Gemini Chatbot API for general queries. The weather data is fetched using the OpenWeatherMap API.
Features

    Dashboard Page: Displays temperature charts (Bar, Line, and Doughnut) based on the weather data for a selected city.
    Tables Page: Shows paginated weather data in a table and includes a chatbot that can handle general questions using the Gemini Chatbot API.
    Weather Widget: Changes its background based on the weather conditions (clear, clouds, rain, etc.).

Technologies Used

HTML/CSS: For structuring and styling the pages.
JavaScript: Handles the business logic, including weather data fetching, chatbot interaction, and updating the UI.
OpenWeather API: Provides weather forecast data for cities.
Gemini Chatbot API: Provides chatbot responses for general queries.
Chart.js: Used for displaying Bar, Line, and Doughnut charts based on weather data.

Prerequisites

Before running the project, make sure you have the following installed:

    Node.js (for running a local development server if needed)
    VSCode Live Server (if running with Visual Studio Code)

You will need API keys for both the OpenWeatherMap and Gemini APIs

Replace the apiKey variable in the i222475_Assignment2_Dashboard.js and i222475_Assignment2_Table.js files with your own API key.

Replace the geminiApiUrl with your API key in i222475_Assignment2_Table.js.

Run the Project

    Open the project in Visual Studio Code.
    Open either index.html or i222475_Table.html.
    Right-click on the file and select Open with Live Server.
    The application should now open in your default browser.

On the Dashboard page (index.html), enter a city name in the search bar and press "Search" to view weather data in the form of charts.
On the Tables page (i222475_Table.html), enter a city name to view the weather forecast in a table. You can also interact with the chatbot by entering a question in the input field.

