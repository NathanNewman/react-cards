import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [cardCount, setCardCount] = useState(1);
  const [autoDraw, setAutoDraw] = useState(0);

  // Effect for drawing one card.
  useEffect(() => {
    if (!deck) {
      async function fetchDeck() {
        const res = await axios.get("https://deckofcardsapi.com/api/deck/new/");
        setDeck(res.data.deck_id);
      }
      fetchDeck();
    }
  }, [deck]);

  // Effect for autoDraw
  useEffect(() => {
    // if autoDraw is set to 1, set interval to add to autoDraw each second.
    if (autoDraw === 1) {
      setInterval(() => {
        setAutoDraw(autoDraw + 1);
      }, 1000);
    }
    // If autoDraw is greater than one, draw a card.
    if (autoDraw > 1) {
      handleDrawCard();
    }
  }, [autoDraw]);

  // Handles drawing a card for both draw and auto draw.
  const handleDrawCard = async () => {
    if (cardCount > 52) {
      setDeck(null);
      setCardCount(1);
    } else {
      const res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
      );
      setCard(res.data.cards[0]);
      setCardCount(cardCount + 1);
    }
  };

  // if autoDraw is falsey/zero, setAutoDraw to one which starts interval. if autoDraw is truthy/not zero
  // set autoDraw to zero.
  const handleAutoDraw = async () => {
    autoDraw ? setAutoDraw(0) : setAutoDraw(1);
  };

  return (
    <div>
      <button onClick={handleDrawCard}>Draw Card</button>
      <button onClick={handleAutoDraw}>Auto Draw</button>
      {card ? <Card card={card} /> : <p>Play Card</p>}
      {console.log(autoDraw)}
    </div>
  );
};

export default Deck;
