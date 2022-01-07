import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import Breadcrumbs from "./BreadCrumb";

export default function StudyPage() {
  const deck = useRouteMatch();
  const { deckId } = useParams();
  const history = useHistory();

  //States
  const [flip, setFlip] = useState(false);
  const [decks, setDecks] = useState("");
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [cardIndex, setCardIndex] = useState(0);

  //Next Button
  function handleNextClick() {
    if (cards.length > cardIndex + 1) {
      setCardIndex(cardIndex + 1);
      setCurrentCard(cards[cardIndex + 1]);
      setFlip(!flip);
    } else if (
      window.confirm(
        "Restart cards?\n\nClick 'cancel' to return to the home page"
      )
    ) {
      setCardIndex(0);
      setCurrentCard(cards[0]);
      setFlip(!flip);
    } else {
      history.push("/");
    }
  }

  //Flip button
  function handleFlipClick() {
    setFlip(!flip);
  }

  //Retrieve card data
  useEffect(() => {
    async function loadDecks() {
      const response = await readDeck(deckId);
      const decksFromAPI = response;
      setDecks(decksFromAPI);
      setCards(decksFromAPI.cards);
      setCurrentCard(decksFromAPI.cards[cardIndex]);
    }
    loadDecks();
  }, []);

  // Not enough cards
  if (cards.length < 3) {
    return (
      <div>
        <Breadcrumbs
          crumbs={[
            { label: "Home", link: "/" },
            { label: decks.name, link: `${deck.url}` },
            { label: "Study" },
          ]} />
        <h1>{decks.name}: Study</h1>  
        <h3>Not enough cards</h3>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in this
          deck
        </p>
        <a href={`/decks/${decks.id}/cards/new`} className="btn btn-primary">Add Cards</a>
      </div>
    );
  }

  //Card Render
  if (flip === false) {
    return (
      <div>
        <Breadcrumbs
          crumbs={[
            { label: "Home", link: "/" },
            { label: decks.name, link: `${deck.url}` },
            { label: "Study" },
          ]}
        />
        <div className="card">
          <div className="card-header">Card {cardIndex + 1} of {cards.length}</div>
          <div className="card-body">
            <h5 className="card-title">{decks.name}: Study</h5>
            <p className="card-text">
            {currentCard.front}
            </p>
            <button onClick={handleFlipClick} className="btn btn-primary pr-4 pl-4">
              Flip
            </button>
          </div>
        </div>
      </div>
    );
  } else if (flip === true) {
    return (
      <div>
        <Breadcrumbs
          crumbs={[
            { label: "Home", link: "/" },
            { label: decks.name, link: `${deck.url}` },
            { label: "Study" },
          ]}
        />
        <div className="card">
          <div className="card-header">{cardIndex + 1} of {cards.length}</div>
          <div className="card-body">
            <h5 className="card-title">{decks.name}: Study</h5>
            <p className="card-text">
            {currentCard.back}
            </p>
            <button onClick={handleFlipClick} className="btn btn-primary pr-4 pl-4 mr-2">
              Flip
            </button>
            <button onClick={handleNextClick} className="btn btn-primary pr-4 pl-4">Next</button>
          </div>
        </div>
      </div>
    );
  }
}
