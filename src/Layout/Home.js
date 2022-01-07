import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api/index";
import DeleteButton from "./DeleteButton";

function Home() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);
  

  useEffect(() => {
    listDecks().then(setDecks).catch(setError);
  }, []);

  return (
    <div>
      <h3>
        <a href="/decks/new" className="btn btn-secondary">
          Create Deck
        </a>
      </h3>
      {decks.map((deck, index) => {
        const url = `/decks/${deck.id}`;
        return (
          <div className="card w-75" key={index}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h3 className="card-title">{deck.name}</h3>
                <h5 className="card-subtitle mb-2 text-muted">
                  {deck.cards.length} Cards
                </h5>
              </div>
              <p className="card-text">{deck.description}</p>
              <div className="d-flex justify-content-between">
                <div>
                  <a
                    href={`${url}/study`}
                    className="btn btn-primary pr-4 pl-4 mr-2"
                  >
                    Study
                  </a>
                  <a href={url} className="btn btn-primary pr-4 pl-4">
                    View
                  </a>
                </div>
                <div className="d-flex justify-content-end">
                  <DeleteButton deckId={deck.id} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
