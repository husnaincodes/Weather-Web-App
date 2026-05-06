const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const handleResponse = async (res) => {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const getWeather = async (city) => {
  const res = await fetch(
    `${API_BASE_URL}/api/weather/${encodeURIComponent(city.trim())}`
  );
  return handleResponse(res);
};

export const getHistory = async () => {
  const res = await fetch(`${API_BASE_URL}/api/weather/history/all`);
  return handleResponse(res);
};

export const clearHistory = async () => {
  const res = await fetch(`${API_BASE_URL}/api/weather/history/all`, {
    method: "DELETE"
  });
  return handleResponse(res);
};