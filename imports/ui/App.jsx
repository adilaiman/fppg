import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import Players from '/imports/api/players';
import Teams from '/imports/api/teams';
import Fixtures from '/imports/api/fixtures';
import Pairs from '/imports/api/pairs';

import { PlayerCard } from './PlayerCard';


export const App = () => {

  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const [winMessage, setWinMessage] = useState('');

  const { players, teams, fixtures, pairs} = useTracker(() => {
    return ({
      players: Players.find({}, { sort: {'team._members': 1} }).fetch(),
      teams: Teams.find({}).fetch(),
      fixtures: Fixtures.find({}).fetch(),
      pairs: Pairs.find({}).fetch(),
    });
  });

  const randomIndex = Math.floor(Math.random() * (pairs.length -1));

  const handleCardClick = (win) => {
    setTimeout(function() {
      if (win) {
        setScore(prevScore => prevScore + 1);
        setCounter(prevCounter => prevCounter + 1);
        if (score === 9) {
          setWinMessage('You Win!');
        }
      } else {
        setCounter(prevCounter => prevCounter + 1);
      }
    }.bind(this), 1000)
  }

  return (
    <div>
      <h1>FPPG Game</h1>
      <h2>{winMessage}</h2>
      <h2>Score: {score}</h2>
      <h2>Played: {counter}</h2>
      {pairs.slice(randomIndex-1, randomIndex).map(pair =>
        <PlayerCard key={pair.playerOne._id} player={pair.playerOne} higherFPPG={pair.higherFPPG} teams={teams} fixtures={fixtures} onCardClick={handleCardClick} />
      )}
      {pairs.slice(randomIndex-1, randomIndex).map(pair =>
        <PlayerCard key={pair.playerTwo._id} player={pair.playerTwo} higherFPPG={pair.higherFPPG} teams={teams} fixtures={fixtures} onCardClick={handleCardClick} />
      )}
    </div>
  );
};
