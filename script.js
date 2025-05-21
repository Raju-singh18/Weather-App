 
document.getElementById('getWeatherBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  const weatherResult = document.getElementById('weatherResult');
  const locationElem = document.getElementById('location');
  const temperatureElem = document.getElementById('temperature');
  const conditionElem = document.getElementById('condition');
  const weatherIcon = document.getElementById('weatherIcon');

  if (city === '') {
    alert('Please enter a city name.');
    return;
  }

  const apiKey = '71f9f13fbd6e49bfb0f180320251705';
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found or API error.');
      }
      return response.json();
    })
    .then(data => {
      const temperature = data.current.temp_c;
      const condition = data.current.condition.text;
      const iconUrl = data.current.condition.icon;
      const locationName = `${data.location.name}, ${data.location.country}`;

      locationElem.textContent = locationName;
      temperatureElem.textContent = `Temperature: ${temperature}°C`;
      conditionElem.textContent = `Condition: ${condition}`;
      weatherIcon.innerHTML = `<img src="https:${iconUrl}" alt="${condition}" />`;

      weatherResult.classList.remove('hidden');
    })
    .catch(error => {
      alert(error.message);
      weatherResult.classList.add('hidden');
    });
});

