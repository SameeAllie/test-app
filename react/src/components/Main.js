import React, { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../components/WeatherCard";
import ItemCard from "./ItemCard";
import { temperature } from "../utils/weatherApi";
import "../blocks/Main.css";
import "../blocks/Card.css";

function Main({
  onLike,
  weatherTemp,
  onSelectCard,
  clothingItems,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const getWeatherType = () => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  };

  const weatherType = getWeatherType();
  const currentTemp = temperature(weatherTemp);
  const currentTempString = currentTemp[currentTemperatureUnit];
  // Filter clothingItems based on weather temperature
  const filteredClothingItems = clothingItems.filter((item) => {
    // Assuming each item has a property 'minTemperature' and 'maxTemperature'
    const minTemp = item.minTemperature;
    const maxTemp = item.maxTemperature;

    return weatherTemp >= minTemp && weatherTemp <= maxTemp;
  });

  return (
    <main className="main">
      <div className="main__container">
        <WeatherCard day={true} type="sunny" weatherTemp={weatherTemp} />

        <section className="main__clothing">
          <p className="main__text">
            Today is {currentTempString} / You may want to wear:
          </p>

          <ul className="main__cards">
            {Array.isArray(filteredClothingItems) &&
              filteredClothingItems.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onSelectCard={onSelectCard}
                  onLike={onLike}
                  isLoggedIn={isLoggedIn}
                />
              ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Main;
