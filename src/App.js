import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Header from './Components/Header';
import Deck from './Components/Deck';
import ScoreTable from './Components/ScoreTable';
import { getCards, getScores, addScores, resetScores } from './API';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const cardCount = 10;
  const [cardOfDeckOne, setCardOfDeckOne] = React.useState(
    Array.from({ length: cardCount }, (_, i) => ({ image: '', code: i }))
  );
  const [cardOfDeckTwo, setCardOfDeckTwo] = React.useState(
    Array.from({ length: cardCount }, (_, i) => ({ image: '', code: i }))
  );
  const [scores, setScores] = React.useState([]);
  const [openCards, setOpenCards] = React.useState(['', '']);
  const [matchedCardCount, setMatchedCardCount] = React.useState(0);
  const [turnCount, setTurnCount] = React.useState(0);
  const [clickedDeck, setClickedDeck] = React.useState('');

  const shuffleArray = (array, deck) => {
    const newCards = array.slice();
    for (let i = newCards.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    if (deck === 1) setCardOfDeckOne(newCards);
    else setCardOfDeckTwo(newCards);
  };

  React.useEffect(() => {
    getCards()
      .then((data) => {
        shuffleArray(data.cards, 1);
        shuffleArray(data.cards, 2);
      })
      .catch((err) => toast(err.toString()));
    getScores()
      .then((data) => {
        setScores(data.scores);
      })
      .catch((err) => toast(err.toString()));
  }, []);

  const resetHighScore = () => {
    resetScores()
      .then(() => {
        getScores
          .then((data) => setScores(data.scores))
          .catch((err) => toast(err.toString()));
      })
      .catch((err) => toast(err.toString()));
  };

  const flipCard = (e, deck) => {
    e.preventDefault();
    const cardValue = e.target.getAttribute('data-card-value');
    const openCardCopy = openCards.slice();
    openCardCopy[deck - 1] = cardValue;
    setClickedDeck(deck);

    if (deck === 1) {
      const newDeckOne = cardOfDeckOne.map((card) => {
        return card.code === cardValue
          ? { ...card, isVisible: true }
          : { ...card };
      });
      setCardOfDeckOne(newDeckOne);
    } else {
      const newDeckTwo = cardOfDeckTwo.map((card) => {
        return card.code === cardValue
          ? { ...card, isVisible: true }
          : { ...card };
      });
      setCardOfDeckTwo(newDeckTwo);
    }
    setOpenCards(openCardCopy.slice());

    if (openCardCopy[0] !== '' && openCardCopy[1] !== '') {
      if (openCardCopy[0] === openCardCopy[1]) {
        // Increase matched count
        setMatchedCardCount(matchedCardCount + 1);
        setOpenCards(['', '']);
        if (matchedCardCount + 1 === cardCount) {
          let person = '';
          do {
            toast('Congratulations! You have won the game!');
            // eslint-disable-next-line no-alert
            person = prompt('Please enter your name');
          } while (person === null);
          addScores({ name: person, score: turnCount })
            .then(() =>
              getScores()
                .then((data) => setScores(data.scores))
                .catch((err) => toast(err.toString()))
            )
            .catch((err) => toast(err.toString()));
        }
      } else {
        setTimeout(() => {
          const newDeckOne = cardOfDeckOne.map((card) => {
            return card.code === openCardCopy[0] && card.isVisible
              ? { ...card, isVisible: false }
              : { ...card };
          });
          const newDeckTwo = cardOfDeckTwo.map((card) => {
            return card.code === openCardCopy[1] && card.isVisible
              ? { ...card, isVisible: false }
              : { ...card };
          });
          setCardOfDeckOne(newDeckOne);
          setCardOfDeckTwo(newDeckTwo);
        }, 1000);
        setTurnCount(turnCount + 1);
        setOpenCards(['', '']);
      }
      setClickedDeck('');
    }
  };

  const shuffleDecks = () => {
    shuffleArray(cardOfDeckOne, 1);
    shuffleArray(cardOfDeckTwo, 2);
    setTurnCount(0);
    if (matchedCardCount === cardCount) {
      const deckOne = cardOfDeckOne.map(({ isVisible, ...card }) => ({
        ...card,
      }));
      const deckTwo = cardOfDeckTwo.map(({ isVisible, ...card }) => ({
        ...card,
      }));
      setCardOfDeckOne(deckOne);
      setCardOfDeckTwo(deckTwo);
    }
  };

  return (
    <>
      <Header
        turnCount={turnCount}
        shuffleDecks={shuffleDecks}
        resetHighScore={resetHighScore}
      />
      <Deck
        flipCard={flipCard}
        cardOfDeckOne={cardOfDeckOne}
        cardOfDeckTwo={cardOfDeckTwo}
        clickedDeck={clickedDeck}
      />
      <ScoreTable scores={scores} />
      <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
    </>
  );
}

export default App;
