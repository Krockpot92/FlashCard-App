import React, { useState, useEffect } from "react";
import Breadcrumbs from "../BreadCrumb";
import { readDeck, readCard, updateCard } from "../../utils/api";
import { useRouteMatch, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";

export default function EditCard() {
  const [decks, setDecks] = useState({});

  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

  const history = useHistory();

  const { deckId } = useParams();
  const { cardId } = useParams();

  useEffect(() => {
    async function loadDecks() {
      const response = await readDeck(deckId);
      const decksFromAPI = response;
      setDecks(decksFromAPI);
    }
    async function loadCards() {
      const response = await readCard(cardId);
      const CardsFromAPI = response;
      setCardFront(CardsFromAPI.front);
      setCardBack(CardsFromAPI.back);
    }
    loadDecks();
    loadCards();
  }, []);

  const handleCardFront = (event) => setCardFront(event.target.value);
  const handleCardBack = (event) => setCardBack(event.target.value);

  const handleDeckSubmit = (event) => {
    event.preventDefault();
    console.log(2);
    updateCard({
      front: cardFront,
      back: cardBack,
      id: cardId,
      deckId: parseInt(deckId),
    }).then(() => history.push(`/decks/${deckId}`));
  };

  return (
    <div>
      <Breadcrumbs
        crumbs={[
          { label: "Home", link: "/" },
          { label: `Deck ${decks.name}` },
          { label: `Edit Card ${cardId}` },
        ]}
      />
      <h1>Edit Card</h1>
      <CardForm
        submitHandle={handleDeckSubmit}
        handleCardFrontChange={handleCardFront}
        cardFront={cardFront}
        handleCardBackChange={handleCardBack}
        cardBack={cardBack}
        deckId={deckId}
        buttonOne="Cancel"
        buttonTwo="Submit"
      />
    </div>
  );
}
