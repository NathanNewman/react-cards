import React, { useState, useEffect } from "react";
import axios from 'axios';
import Card from "./Card";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);

  useEffect(() => {
    async () => {
      const res = await axios.get("https://deckofcardsapi.com/api/deck/new/");
      setDeck(res.data.deck_id);
    };
  }, [setDeck]);

  useEffect(() => {
    async () => {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
        setCard(res.data);
    }
  });

  return (
    <div>
        {deck ? <button onClick={setCard}>Get Deck</button> : <button onClick={setDeck}>Draw Card</button>}
        <Card props={card}/>
            
    </div>
  );
};

export default Deck;
