import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import History from "./components/History";
import { getHistory, getWeather } from "./services/weatherService";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  const loadHistory = async () => {
    try {
      const historyData = await getHistory();
      setHistory(historyData);
    } catch (err) {
      setError(err.message || "Unable to load search history");
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleSearch = async (city) => {
    if (!city.trim()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await getWeather(city);
      setWeather(data);
      await loadHistory();
    } catch (err) {
      setError(err.message || "Unable to fetch weather");
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = (city) => {
    handleSearch(city);
  };

  return (
    <div className={`app-shell${isDark ? " theme-dark" : ""}`}>
      <div className="aurora aurora-left" />
      <div className="aurora aurora-right" />

      <main className="dashboard">
        <header className="dashboard-header">
          <div className="header-row">
            <p className="eyebrow">Live Conditions</p>
            <button
              className="theme-toggle"
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-pressed={isDark}
            >
              {isDark ? "Light mode" : "Dark mode"}
            </button>
          </div>
          <h1>Weather Dashboard</h1>
          <p className="subtitle">
            Search any city to view real-time weather insights and track recent
            lookups.
          </p>
        </header>

        <section className="dashboard-content">
          <div className="left-panel">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            {error && <p className="error-message">{error}</p>}
            <WeatherCard data={weather} isLoading={isLoading} />
          </div>

          <aside className="right-panel">
            <History
              items={history}
              onSelect={handleHistorySelect}
            />
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;