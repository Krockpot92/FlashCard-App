import React, { useEffect, useState } from "react";
import { createCard, readDeck } from "../../utils/api";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../BreadCrumb";

export default function AddCard() {
  const { deckId } = useParams();
  const [decks, setDecks] = useState({});
  const[cardFront, setCardFront]= useState("")
  const[cardBack, setCardBack]= useState("")

  const handleCardFrontChange = (event) => setCardFront(event.target.value);
  const handleCardBackChange = (event) => setCardBack(event.target.value);

  useEffect(() => {
    async function loadDecks() {
      const response = await readDeck(deckId);
      const decksFromAPI = response;
      setDecks(decksFromAPI);
    }
    loadDecks();
  }, []);

  const handleDeckSubmit = (event) => {
    event.preventDefault();
    console.log(2);
    createCard(deckId,{
        front: cardFront,
        back: cardBack,
      }).then(() => window.location.reload());

  };

  console.log(cardFront,cardBack)

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

      <form onSubmit={handleDeckSubmit}>
        <div class="mb-3">
          <label htmlFor="cardFront" class="form-label">
            Card Front
          </label>
          <textarea
            class="form-control"
            id="cardFront"
            name="cardFront"
            placeholder="Front side of card"
            onChange={handleCardFrontChange}
            value={cardFront}
          />
        </div>

        <div class="mb-3">
          <label htmlFor="cardBack" class="form-label">Card Back</label>
          <textarea
            class="form-control"
            id="cardBack"
            name="cardBack"
            placeholder="back side of card"
            onChange={handleCardBackChange}
            value={cardBack}
          />
        </div>
        <a href={`/decks/${deckId}`} class="btn btn-secondary pr-4 pl-4 mr-2">
          Done
        </a>
        <button type="submit" class="btn btn-primary pr-4 pl-4">
          Save
        </button>
      </form>
    </div>
  );
}
