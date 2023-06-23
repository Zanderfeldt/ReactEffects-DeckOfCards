import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';


const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);
  const timerRef = useRef(null);

  // At mount load deck from API into state
  useEffect(() => {
    async function newDeck() {
      const deckRes = await axios.get(
        'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      setDeck(deckRes.data);
    }
    newDeck();
  }, []);

  useEffect(() => {
    const draw = async () => {
      let { deck_id } = deck;
      
      try {
        let drawRes = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
  
        if (drawRes.data.remaining === 0) {
          setAutoDraw(false);
          throw new Error("no cards remaining!");
        }
  
        const card = drawRes.data.cards[0];
  
        setDrawn(d => [
          ...d,
          { 
            id: card.code,
            name: card.value + " of " + card.suit,
            image: card.image
          }
        ]);
      } catch (e) {
        alert(e);
      }
    }

    if (autoDraw && !timerRef.current) {
      timerRef.current = setInterval(async () => {
        await draw();
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [autoDraw, deck]);
  
  const toggleAutoDraw = () => {
    setAutoDraw(auto => !auto);
  }

  const cards = drawn.map(c => (
    <Card key={c.id} name={c.name} image={c.image} />
  ));

  return (
    <div>
      {deck ? (
        <button onClick={toggleAutoDraw}>{autoDraw ? 'Stop' : 'Start' } drawing</button>
      ): null}
      <div className='Deck-cardarea'>
        {cards}
      </div>
    </div>
  );
}

export default Deck;