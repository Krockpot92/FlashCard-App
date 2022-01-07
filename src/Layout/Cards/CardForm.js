import React from "react";

export default function CardForm({
  submitHandle,
  handleCardFrontChange,
  cardFront,
  handleCardBackChange,
  cardBack,
  deckId,
  buttonOne,
  buttonTwo,
  isPlaceholderFront,
  isPlaceholderBack,
}) {
  return (
    <div>
      <form onSubmit={submitHandle}>
        <div class="mb-3">
          <label htmlFor="cardFront" class="form-label">
            Card Front
          </label>
          <textarea
            class="form-control"
            id="cardFront"
            name="cardFront"
            placeholder={isPlaceholderFront}
            onChange={handleCardFrontChange}
            value={cardFront}
          />
        </div>

        <div class="mb-3">
          <label htmlFor="cardBack" class="form-label">
            Card Back
          </label>
          <textarea
            class="form-control"
            id="cardBack"
            name="cardBack"
            placeholder={isPlaceholderBack}
            onChange={handleCardBackChange}
            value={cardBack}
          />
        </div>
        <a href={`/decks/${deckId}`} class="btn btn-secondary pr-4 pl-4 mr-2">
          {buttonOne}
        </a>
        <button type="submit" class="btn btn-primary pr-4 pl-4">
          {buttonTwo}
        </button>
      </form>
    </div>
  );
}
