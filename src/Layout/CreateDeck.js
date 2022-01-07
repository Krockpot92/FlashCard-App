import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import Breadcrumbs from "./BreadCrumb";

export default function CreateDeck() {
  const [deckName, setDeckName] = useState("");
  const [deckInfo, setDeckInfo] = useState("");

  const history = useHistory();

  const handleDeckNameChange = (event) => setDeckName(event.target.value);
  const handleDeckInfoChange = (event) => setDeckInfo(event.target.value);

  const handleDeckSubmit = (event) => {
    event.preventDefault();
    console.log(2);
    createDeck({
      name: deckName,
      description: deckInfo,
    }).then((newDeck) => history.push(`/decks/${newDeck.id}`));
  };

  console.log(deckName, deckInfo);

  return (
    <div>
      <Breadcrumbs
        crumbs={[{ label: "Home", link: "/" }, { label: "Create Deck" }]}
      />
      <h1>Create deck page</h1>

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
        <a href='/' class="btn btn-secondary pr-4 pl-4 mr-2">Cancel</a>
        <button type="submit" class="btn btn-primary pr-4 pl-4">
          Submit
        </button>
      </form>
    </div>
  );
}
