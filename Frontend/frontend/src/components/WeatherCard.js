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
  const tempMin = Math.round(data.main.temp_min);
  const tempMax = Math.round(data.main.temp_max);
  const condition = data.weather[0].main.toLowerCase();
  const windSpeed = Math.round(data.wind.speed);
  const windGust = data.wind.gust ? Math.round(data.wind.gust) : null;
  const visibilityKm = data.visibility ? Math.round(data.visibility / 100) / 10 : null;
  const cloudCover = typeof data.clouds?.all === "number" ? data.clouds.all : null;
  const localDate = new Date((data.dt + data.timezone) * 1000);
  const dayLabel = localDate.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "UTC",
  });
  const timeLabel = localDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  const formatTime = (timestamp) =>
    new Date((timestamp + data.timezone) * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });

  const sunrise = formatTime(data.sys.sunrise);
  const sunset = formatTime(data.sys.sunset);

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
          <p className="weather-day">
            {data.sys.country ? `${data.sys.country} · ${dayLabel}` : dayLabel}
          </p>
          <p className="weather-meta">Local time {timeLabel}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <div className={`weather-icon-badge ${conditionType}`}>
          {renderIcon()}
        </div>
      </div>

      <p className="temperature">{temp}°C</p>

      <div className="weather-badges">
        <span className="badge">Feels {feelsLike}°C</span>
        <span className="badge">Humidity {data.main.humidity}%</span>
        <span className={`badge${windGust && windGust >= 12 ? " alert" : ""}`}>
          Wind {windSpeed} m/s{windGust ? ` · Gust ${windGust}` : ""}
        </span>
      </div>

      <div className="hero-metrics">
        <div className="metric">
          <span>High / Low</span>
          <strong>
            {tempMax}° / {tempMin}°C
          </strong>
        </div>
        <div className="metric">
          <span>Sunrise</span>
          <strong>{sunrise}</strong>
        </div>
        <div className="metric">
          <span>Sunset</span>
          <strong>{sunset}</strong>
        </div>
      </div>

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
          <strong>{windSpeed} m/s</strong>
        </div>
        <div>
          <span>Pressure</span>
          <strong>{data.main.pressure} hPa</strong>
        </div>
        <div>
          <span>Visibility</span>
          <strong>{visibilityKm ? `${visibilityKm} km` : "-"}</strong>
        </div>
        <div>
          <span>Clouds</span>
          <strong>{cloudCover !== null ? `${cloudCover}%` : "-"}</strong>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;