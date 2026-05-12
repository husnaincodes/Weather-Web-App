# 🌤️ Weather Dashboard

A full-stack weather web application that allows users to search real-time weather data by city, view detailed forecasts, and track recent search history — all powered by a live backend and cloud database.

![Status](https://img.shields.io/badge/status-live-brightgreen) ![Frontend](https://img.shields.io/badge/frontend-Vercel-black) ![Backend](https://img.shields.io/badge/backend-Railway-purple) ![Database](https://img.shields.io/badge/database-MongoDB%20Atlas-green)

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| Frontend | [weather-web-app-two-ebon.vercel.app](https://weather-web-app-two-ebon.vercel.app) |
| Backend API | [weather-web-app-production.up.railway.app](https://weather-web-app-production.up.railway.app) |

---

## ✨ Features

- 🔍 **Search weather by city** — real-time weather data for any city worldwide
- 🌍 **Country filter** — narrow searches by country
- 📊 **Detailed weather info** — temperature, humidity, wind speed, conditions
- 📅 **Weather forecasts** — multi-day forecast view
- 🕒 **Recent search history** — saved to MongoDB Atlas, persists across sessions
- 🌙 **Dark mode** — toggle between light and dark themes
- 📱 **Responsive design** — works on desktop and mobile

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Create React App | Project scaffolding |
| CSS / Tailwind | Styling |
| Vercel | Hosting & deployment |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js 5 | Web framework |
| Mongoose | MongoDB ODM |
| Axios | HTTP requests to weather API |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |
| Railway | Hosting & deployment |

### Database
| Technology | Purpose |
|---|---|
| MongoDB Atlas | Cloud database for search history |

### External API
| API | Purpose |
|---|---|
| OpenWeatherMap API | Real-time weather & forecast data |

---

## 📁 Project Structure

```
Weather-Web-App/
├── Backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── weatherController.js
│   ├── models/
│   │   └── weatherModel.js
│   ├── routes/
│   │   └── weather.js         # API routes
│   ├── server.js              # Entry point
│   ├── package.json
│   └── .gitignore
│
└── Frontend/
    └── frontend/
        ├── public/
        ├── src/
        │   ├── components/    # React components
        │   ├── App.js
        │   └── index.js
        ├── package.json
        └── .gitignore
```

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js v18+
- npm
- MongoDB Atlas account
- OpenWeatherMap API key

### 1. Clone the repository

```bash
git clone https://github.com/husnaincodes/Weather-Web-App.git
cd Weather-Web-App
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
API_KEY=your_openweathermap_api_key
NODE_ENV=development
```

Start the backend:

```bash
npm start
```

Backend runs on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd Frontend/frontend
npm install
```

Create a `.env` file in the `Frontend/frontend/` folder:

```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm start
```

Frontend runs on `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/weather` | Get weather by city |
| GET | `/api/weather/history` | Get recent search history |
| POST | `/api/weather/history` | Save a search to history |
| DELETE | `/api/weather/history` | Clear search history |

### Example Request

```bash
GET /api/weather?city=Lahore
```

### Example Response

```json
{
  "city": "Lahore",
  "country": "PK",
  "temperature": 32,
  "humidity": 45,
  "windSpeed": 12,
  "condition": "Clear",
  "forecast": [...]
}
```

---

## ☁️ Deployment

### Backend — Railway

1. Push code to GitHub
2. Create new project on [railway.app](https://railway.app)
3. Import GitHub repo → set Root Directory to `Backend`
4. Add environment variables in Railway Variables tab
5. Generate domain in Settings → Networking

### Frontend — Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repo → set Root Directory to `Frontend/frontend`
3. Add environment variable `REACT_APP_API_URL` = Railway backend URL
4. Click Deploy

### Database — MongoDB Atlas

1. Create free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create database user with password
3. Whitelist `0.0.0.0/0` in Network Access
4. Copy connection string to `MONGO_URI`

---

## 🔐 Environment Variables

### Backend

| Variable | Description |
|---|---|
| `PORT` | Server port (default 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `API_KEY` | OpenWeatherMap API key |
| `NODE_ENV` | Environment (development/production) |

### Frontend

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Backend API base URL |

---

## 👤 Author

**Husnain Tayab**
- GitHub: [@husnaincodes](https://github.com/husnaincodes)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with React, Node.js, Express, MongoDB Atlas, deployed on Vercel & Railway.
