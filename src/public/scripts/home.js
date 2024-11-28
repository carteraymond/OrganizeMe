async function sendRequest() {
    const userId = document.getElementById('userId').value.trim();
    const locationElement = document.getElementById('location');
    const userElement = document.getElementById('user');
    const temperatureElement = document.getElementById('temperature');
    const resultDiv = document.getElementById('result');

    if (!userId) {
        resultDiv.textContent = 'Please enter a user ID.';
        return;
    }

    try {
        const response = await fetch(`https://nimbus.bradyhodge.dev/user/${userId}`);
        const data = await response.json();
        console.log(data.weather);
        if (data.weather.location) {
            locationElement.textContent = data.weather.location;
        }
        if (data.weather.user) {
            userElement.textContent = data.weather.user;
        }
        if (data.weather.temperature) {
            temperatureElement.textContent = data.weather.temperature;
        }

    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
        locationElement.textContent = '';
        userElement.textContent = '';
        temperatureElement.textContent = '';
    }
}