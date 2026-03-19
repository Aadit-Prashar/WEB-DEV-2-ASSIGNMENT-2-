const API_KEY = "ee3b43396b89fd7239f36527946c0055";
        

        const weatherBox = document.getElementById("weather");
        const historyBox = document.getElementById("history");

        /* ---------- WEATHER FETCH ---------- */
        async function getWeather(city) {

            // small delay for smoother UI
            // await new Promise(r => setTimeout(r, 500));

            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            if (!res.ok) {
                alert("city not found");
                throw new Error("City not found");
            }
            const data = await res.json();
            return data;
        }

         /* ---------- BUTTON CLICK ---------- */
        document.getElementById("searchBtn").onclick = () => {
            const city = cityInput.value.trim();
            if (city) {
                search(city);
            }
        };

        /* ---------- UI RENDER ---------- */
        function renderWeather(d) {
            weatherBox.innerHTML = `
        <div class="weather-item"><label>City</label><span>${d.name}, ${d.sys.country}</span></div>
        <div class="weather-item"><label>Temperature</label><span>${d.main.temp} °C</span></div>
        <div class="weather-item"><label>Weather</label><span>${d.weather[0].main}</span></div>
        <div class="weather-item"><label>Humidity</label><span>${d.main.humidity}%</span></div>
        <div class="weather-item"><label>Wind Speed</label><span>${d.wind.speed} m/s</span></div>
    `;
        }

        /* ---------- SAVE SEARCH HISTORY ---------- */
        function saveHistory(city) {
            let cities = JSON.parse(localStorage.getItem("cities"));

            if (!cities) {
                cities = [];
            }

            cities.push(city); // add city

            localStorage.setItem("cities", JSON.stringify(cities));

            showHistory();
}
        

        /* ---------- SHOW HISTORY ---------- */
        function showHistory() {
    let cities = JSON.parse(localStorage.getItem("cities"));

    if (!cities) {
        cities = [];
    }

    historyBox.innerHTML = "";

    for (let i = 0; i < cities.length; i++) {
        const btn = document.createElement("button");
        btn.innerText = cities[i];

        btn.onclick = function () {
            search(cities[i]);
        };

        historyBox.appendChild(btn);
    }
}

        /* ---------- SEARCH FUNCTION ---------- */
        async function search(city) {
            weatherBox.innerHTML = "";
            try {
                const data = await getWeather(city);
                renderWeather(data);
                saveHistory(data.name); 
            } catch (error) {
                weatherBox.innerHTML = `<p style="color:red">${error.message}</p>`;
            }
        }
       
        /* ---------- ENTER KEY SEARCH ---------- */
        cityInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const city = cityInput.value.trim();
                if (city) {
                    search(city);
                }
            }
        });
        /* ---------- INITIAL LOAD ---------- */
        showHistory();