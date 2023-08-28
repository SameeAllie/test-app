import React, { useContext, useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/Profile.css";

const ClothesSection = ({
  cards,
  onCardClick,
  onAddClick,
  isLoggedIn,
  onLike,
  onUnlike,
  weatherType, // New prop for weather type
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [filteredCards, setFilteredCards] = useState([]);
  // Filter cards based on the current weather type


  useEffect(() => {
    
    const FCards = cards.filter(
      (card) =>
        card.weather === "cold" // card has a weather prop not weatherType. card.weatherType does not exist
    );
    setFilteredCards(FCards)
    console.log(cards)
    console.log(weatherType)
  }, [cards]);

  return (
    <div className="profile__container">
      <div className="profile__subcontainer">
        <p className="profile__title">Your items</p>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Add"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="profile__cards">
        {filteredCards.length === 0 ? (
          <div>No items to display</div>
        ) : (
          filteredCards.map((card) => (
            <ItemCard
              key={card._id}
              item={card}
              onSelectCard={onCardClick}
              onLike={onLike}
              onUnlike={onUnlike}
              isLoggedIn={isLoggedIn}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default ClothesSection;
