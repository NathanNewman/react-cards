import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [drawURL, setDrawURL] = useState(null);

  let count;
  useEffect(() => {
    async function fetchDeck() {
      const res = await axios.get("https://deckofcardsapi.com/api/deck/new/");
      setDeck(res.data.deck_id);
    }
    fetchDeck();
  }, [setDeck]);

  useEffect(() => {
    console.log(drawURL[0]);
    if (drawURL[0]) {
      async function fetchCard() {
        const res = await axios.get(drawURL[0]);
        setCard(res.data.cards[0]);
      }

      fetchCard();
    }
  }, [drawURL]);

  const handleDrawCard = () => {
    count += 1;
    setDrawURL([
      `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`,
      count,
    ]);
  };

  const handleGetDeck = () => {
    setDeck(null);
  };

  return (
    <div>
      {deck ? (
        <button onClick={handleDrawCard}>Draw Card</button>
      ) : (
        <button onClick={handleGetDeck}>Get Deck</button>
      )}
      {card ? <Card card={card} /> : <p>Play Card</p>}
    </div>
  );
};

export default Deck;
