import { Box, Button, CircularProgress, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

type IProps = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: [
    {
      description: string;
    }
  ];
};
export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<IProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const apiKey = "6816b8b86637e11531dca05f9aa96859";
  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    setWeatherData(null);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(res.data);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setError("City not found.");
      } else {
        setError("Failed to fetch weather data. Please try again.");
      }
    }
    setLoading(false);
  };
  return (
    <div className="background-home h-screen p-4">
      <div className="flex flex-col justify-center items-center gap-10">
        <Box display="flex" gap={2}>
          <Typography variant="h3" color="white" fontSize="bold">
            Weather App
          </Typography>
          <Link to="/sign-in">
            {" "}
            <Button
              variant="text"
              startIcon={<LogoutIcon />}
              sx={{
                borderRadius: 2,
                fontSize: "15px",
                color: "text.primary",
                marginTop: 1.5,
              }}
            >
              Log out
            </Button>
          </Link>
        </Box>
        <Box display="flex">
          <input
            placeholder="Search"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border-2 border-blue-600 bg-white p-3 rounded-s-md w-full"
          />
          <Button
            variant="contained"
            className="rounded-e-md"
            onClick={fetchWeather}
          >
            search
          </Button>
        </Box>
        {loading && <CircularProgress />}
        {error && (
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        )}
        {weatherData && (
          <Box className="w-2/3 h-1/3 bg-purple-300 bg-opacity-60 border-purple-400 border-2 rounded-lg p-4 flex flex-col gap-2">
            <Typography variant="h5">{weatherData.name}</Typography>
            <Typography>Temperature : {weatherData.main.temp}°C</Typography>
            <Typography>
              Weather : {weatherData.weather[0].description}
            </Typography>
            <Typography>Humidity : {weatherData.main.humidity}%</Typography>
          </Box>
        )}
      </div>
    </div>
  );
}
