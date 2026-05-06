import React from "react";

const WeatherCard = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="card loading-card">
        <p>Fetching latest weather details...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="card empty-card">
        <p>Search for a city to view weather information.</p>
      </div>
    );
  }

  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const condition = data.weather[0].main.toLowerCase();

  const getConditionType = () => {
    if (condition.includes("rain") || condition.includes("drizzle")) {
      return "rain";
    }

    if (condition.includes("thunder")) {
      return "rain";
    }

    if (condition.includes("snow")) {
      return "cloud";
    }

    if (condition.includes("cloud")) {
      return "cloud";
    }

    if (condition.includes("clear")) {
      return "sun";
    }

    if (temp >= 28) {
      return "sun";
    }

    if (temp <= 10) {
      return "cloud";
    }

    return "sun";
  };

  const conditionType = getConditionType();

  const renderIcon = () => {
    if (conditionType === "rain") {
      return (
        <svg
          className="weather-icon"
          viewBox="0 0 64 64"
          role="img"
          aria-label="Rain"
        >
          <path
            d="M20 42h22a12 12 0 0 0 0-24 15 15 0 0 0-29-2A10 10 0 0 0 20 42Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M22 48l-3 6M32 48l-3 6M42 48l-3 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    if (conditionType === "cloud") {
      return (
        <svg
          className="weather-icon"
          viewBox="0 0 64 64"
          role="img"
          aria-label="Cloud"
        >
          <path
            d="M18 42h28a12 12 0 0 0 0-24 16 16 0 0 0-31-2A10 10 0 0 0 18 42Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    return (
      <svg
        className="weather-icon"
        viewBox="0 0 64 64"
        role="img"
        aria-label="Sun"
      >
        <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
        <path
          d="M32 6v8M32 50v8M6 32h8M50 32h8M12.6 12.6l5.6 5.6M45.8 45.8l5.6 5.6M12.6 51.4l5.6-5.6M45.8 18.2l5.6-5.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2>{data.name}</h2>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <div className={`weather-icon-badge ${conditionType}`}>
          {renderIcon()}
        </div>
      </div>

      <p className="temperature">{temp}°C</p>

      <div className="weather-grid">
        <div>
          <span>Feels Like</span>
          <strong>{feelsLike}°C</strong>
        </div>
        <div>
          <span>Humidity</span>
          <strong>{data.main.humidity}%</strong>
        </div>
        <div>
          <span>Wind</span>
          <strong>{Math.round(data.wind.speed)} m/s</strong>
        </div>
        <div>
          <span>Pressure</span>
          <strong>{data.main.pressure} hPa</strong>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;