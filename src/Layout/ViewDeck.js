import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import Breadcrumbs from "./BreadCrumb";
import DeleteButton from "./DeleteButton";
import DeleteCardButton from "./Cards/DeleteCardButton";

export default function ViewDeck() {
  const { deckId } = useParams();

  const [decks, setDecks] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const response = await readDeck(deckId);
      setDecks(response);
      setCards(response.cards);
    }
    loadDecks();
  }, []);

  console.log(cards);

  
    return (
      <div>
        <Breadcrumbs
          crumbs={[{ label: "Home", link: "/" }, { label: decks.name }]}
        />
        <div>
          <div className="mb-3" >
            <div >
              <h3>{decks.name}</h3>
              <p>{decks.description}</p>
              <div className="d-flex justify-content-between">
                <div>
                  <a
                    href={`/decks/${decks.id}/Edit`}
                    className="btn btn-secondary pr-4 pl-4 mr-2 "
                  >
                    Edit
                  </a>
                  <a
                    href={`/decks/${decks.id}/study`}
                    className="btn btn-primary pr-4 pl-4 mr-2 "
                  >
                    Study
                  </a>
                  <a
                    href={`/decks/${decks.id}/cards/new`}
                    className="btn btn-primary pr-4 pl-4 "
                  >
                    Add Cards
                  </a>
                </div>
                <DeleteButton deckId={deckId} />
              </div>
            </div>
          </div>
        </div>
        <h1>Cards</h1>
        {cards.map((card, index) => {
          //console.log(card.id)
          return (
            <div key={index}>
              <div className="card">
                
                <div className="card-body">
                  <div className="d-flex justify-content-between ">
                    <h5 className="col-6 card-text">{card.front}</h5>
                    <h5 className="col-6 card-text">{card.back}</h5>
                  </div>
                  <div className="d-flex justify-content-end">
                    <a
                      href={`/decks/${decks.id}/cards/${card.id}/edit`}
                      className="btn btn-secondary pr-4 pl-4 mr-2"
                    >
                      Edit
                    </a>
                    <DeleteCardButton cardId={card.id} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  
  
}
