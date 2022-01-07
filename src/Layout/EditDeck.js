import React, { useEffect, useState } from "react";
import Breadcrumbs from "./BreadCrumb";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

export default function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();

  const [decks, setDecks] = useState({});
  const [deckName, setDeckName] = useState("");
  const [deckInfo, setDeckInfo] = useState("");

  const handleDeckNameChange = (event) => setDeckName(event.target.value);
  const handleDeckInfoChange = (event) => setDeckInfo(event.target.value);

  useEffect(() => {
    async function loadDecks() {
      const response = await readDeck(deckId);
      const decksFromAPI = response;
      setDecks(decksFromAPI);
      setDeckName(decksFromAPI.name);
      setDeckInfo(decksFromAPI.description);
    }
    loadDecks();
  }, []);

  const handleDeckSubmit = (event) => {
    event.preventDefault();
    console.log(2);
    updateDeck({
      name: deckName,
      description: deckInfo,
      id: deckId,
    }).then(() => history.push(`/decks/${deckId}`));
  };

  return (
    <div>
      <Breadcrumbs
        crumbs={[
          { label: "Home", link: "/" },
          { label: decks.name },
          { label: "Edit Deck" },
        ]}
      />

      <form onSubmit={handleDeckSubmit}>
        <div class="mb-3">
          <label htmlFor="deckName" class="form-label">
            Create Deck
          </label>
          <input
            type="text"
            class="form-control"
            id="deckName"
            name="deckName"
            placeholder="Deck name"
            onChange={handleDeckNameChange}
            value={deckName}
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea
            class="form-control"
            id="deckInfo"
            name="deckInfo"
            placeholder="Brief description of the deck"
            rows="5"
            onChange={handleDeckInfoChange}
            value={deckInfo}
          />
        </div>
        <a href={`/decks/${decks.id}`} class="btn btn-secondary pr-4 pl-4 mr-2">
          Cancel
        </a>
        <button type="submit" class="btn btn-primary pr-4 pl-4">
          Submit
        </button>
      </form>
    </div>
  );
}
