import React, { useState, useEffect } from 'react';
import Data from '../Data';
import Card from './Card';


const GameBoard = ({width, height}) => {
  const [cards, setCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [stopFlip, setStopFlip] = useState(false);
  const [won, setWon] = useState(false);
  const [points, setPoints] = useState(0);
  const [movesCount, setMovesCount] = useState(0);

  const NewGame = () => {
    try {
      setTimeout(() => {
        // const randomOrderCards = Data.sort(() => 0.5 - Math.random());
        // const randomOrderCards = Data
        //   .reduce((acc, item) => acc.concat([item, item]), [])
        //   .sort(() => 0.5 - Math.random());
        const randomOrderCards = Data
            .reduce((acc, item) => acc.concat([item, {...item, id: item.id + Data.length + 1}]), [])
            .sort(() => 0.5 - Math.random());
        console.log(randomOrderCards);
        setCards(randomOrderCards);
        setMoves(0);
        setFirstCard(null);
        setSecondCard(null);
        setStopFlip(false);
        setWon(false);
        setPoints(0);
        setMovesCount(0);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectedCards = (item) => {
    console.log(typeof item);
    if (firstCard !== null && firstCard.id !== item.id) {
      setSecondCard(item);
    } else {
      setFirstCard(item);
    }
  };
  
  useEffect(() => {
    if (firstCard && secondCard) {
      setStopFlip(true);
      if (firstCard.name === secondCard.name) {
        setCards((prevCards) => {
          return prevCards.map((unit) => {
            if (unit.name === firstCard.name) {
              return { ...unit, matched: true};
            } else {
              return unit;
            }
          })
        })
        setWon((prevWon) => prevWon + 1);
        setPoints((prevPoints) => prevPoints + 1);
        removeSelection();
      } else {
        setTimeout(() => {
          removeSelection()
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  const removeSelection = () => {
    setFirstCard(null);
    setSecondCard(null);
    setStopFlip(false);
    setMoves((prevMoves) => prevMoves + 1);
  }

  useEffect(() => {
    NewGame();
  }, []);


  
  return (
    <div className="container">
    <h1 className="header">Harry Potter Memory Game</h1>
      <div className="board">
        {
          cards.map((item) => {
            return (
              <Card
                key={item.id}
                item={item}
                handleSelectedCards={handleSelectedCards}
                toggled={
                  item === firstCard || item === secondCard || item.matched
                }
                stopFlip={stopFlip}
              />
            );
          })
        
        }
      </div>
      <div className="comments">
        <h2>
          {points <= (width*height)/2 ? `Счетчик шагов: ${moves}. Отгадано: ${points}` : `Победа! Счетчик шагов: ${(width)}`}
        </h2>
      </div>
      <button onClick={NewGame} className='restart btn'>Новая игра</button>
    </div>
  );
};


export default GameBoard;
