import React, { useEffect, useState } from "react";
import { createCard, readDeck } from "../../utils/api";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../BreadCrumb";
import CardForm from "./CardForm";

export default function AddCard() {
  const { deckId } = useParams();
  const [decks, setDecks] = useState({});
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

  const handleCardFrontChange = (event) => setCardFront(event.target.value);
  const handleCardBackChange = (event) => setCardBack(event.target.value);

  useEffect(() => {
    async function loadDecks() {
      const response = await readDeck(deckId);
      const decksFromAPI = response;
      setDecks(decksFromAPI);
    }
    loadDecks();
  }, [deckId]);

  const handleDeckSubmit = (event) => {
    event.preventDefault();
    console.log(2);
    createCard(deckId, {
      front: cardFront,
      back: cardBack,
    }).then(() => window.location.reload());
  };

  console.log(cardFront, cardBack);

  return (
    <div>
      <Breadcrumbs
        crumbs={[
          { label: "Home", link: "/" },
          { label: decks.name },
          { label: "Add Card" },
        ]}
      />

      <h2>{decks.name}: Add Card</h2>
      <CardForm
        submitHandle={handleDeckSubmit}
        handleCardFrontChange={handleCardFrontChange}
        cardFront={cardFront}
        handleCardBackChange={handleCardBackChange}
        cardBack={cardBack}
        deckId={deckId}
        buttonOne="Done"
        buttonTwo="Save"
        isPlaceholderFront="Front side of card"
        isPlaceholderBack="Back side of card"
      />
    </div>
  );
}
