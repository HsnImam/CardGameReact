import React from 'react';
import PropType from 'prop-types';

const Deck = ({ flipCard, cardOfDeckOne, cardOfDeckTwo, clickedDeck }) => (
  <div className="card-container">
    <fieldset>
      <legend>Deck 1:</legend>
      <div
        className={clickedDeck === 1 ? 'row deck-disabled' : 'row'}
        onClick={(e) => flipCard(e, 1)}
        onKeyDown={(e) => flipCard(e, 1)}
        role="button"
        tabIndex={0}
      >
        {cardOfDeckOne.map((card) => (
          <>
            {card.isVisible ? (
              <img
                key={card.code}
                data-card-value={card.code}
                src={card.image}
                alt={card.code}
              />
            ) : (
              <span
                data-card-value={card.code}
                key={card.code}
                className="card-back"
              />
            )}
          </>
        ))}
      </div>
    </fieldset>
    <fieldset>
      <legend>Deck 2:</legend>
      <div
        className={clickedDeck === 2 ? 'row deck-disabled' : 'row'}
        onClick={(e) => flipCard(e, 2)}
        onKeyDown={(e) => flipCard(e, 1)}
        role="button"
        tabIndex={0}
      >
        {cardOfDeckTwo.map((card) => (
          <>
            {card.isVisible ? (
              <img
                key={card.code}
                data-card-value={card.code}
                src={card.image}
                alt={card.code}
              />
            ) : (
              <span
                data-card-value={card.code}
                key={card.code}
                className="card-back"
              />
            )}
          </>
        ))}
      </div>
    </fieldset>
  </div>
);

Deck.propTypes = {
  flipCard: PropType.func.isRequired,
  cardOfDeckOne: PropType.arrayOf(PropType.object).isRequired,
  cardOfDeckTwo: PropType.arrayOf(PropType.object).isRequired,
  clickedDeck: PropType.string.isRequired,
};

export default Deck;
