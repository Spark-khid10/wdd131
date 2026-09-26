// Footer: current year and last modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;


const temperature = 30; // degrees Celsius
const windSpeed = 10;   // km/h

// Returns the metric wind chill index for a given temperature (°C) and wind speed (km/h).
function calculateWindChill(tempC, windKmh) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
}

// Wind chill only applies when it is at or below 10°C and the wind exceeds 4.8 km/h.
const windChillDisplay =
  temperature <= 10 && windSpeed > 4.8
    ? `${calculateWindChill(temperature, windSpeed).toFixed(1)}\u00B0C`
    : "N/A";

document.getElementById("windchill").textContent = windChillDisplay;