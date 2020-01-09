import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ turnCount, shuffleDecks, resetHighScore }) => (
  <header className="header-container">
    <div className="btn-container">
      <input
        className="btn"
        type="button"
        value="Play/Shuffle"
        onClick={shuffleDecks}
      />
      <input
        className="btn"
        type="button"
        value="Reset high score"
        onClick={resetHighScore}
      />
    </div>
    <div className="score-container">
      <span>Turns so far: </span>
      <span className="score-value">{turnCount}</span>
    </div>
  </header>
);

Header.propTypes = {
  turnCount: PropTypes.number.isRequired,
  shuffleDecks: PropTypes.func.isRequired,
  resetHighScore: PropTypes.func.isRequired,
};

export default Header;
