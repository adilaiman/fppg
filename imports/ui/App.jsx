import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PlayerCard } from './PlayerCard';
import { getAllFixtures } from '/imports/api/fixtures-service.js';
import { getAllPairs } from '/imports/api/pairs-service.js';
import { getAllPlayers } from '/imports/api/players-service.js';
import { getAllTeams } from '/imports/api/teams-service.js';


export const App = () => {

  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const [win, setWin] = useState(false);
  const [winCount, setWinCount] = useState(0);
  const [winMessage, setWinMessage] = useState('');

  const { players, teams, fixtures, pairs} = useTracker(() => {
    Meteor.subscribe('players');
    Meteor.subscribe('teams');
    Meteor.subscribe('fixtures');
    Meteor.subscribe('pairs');
    return ({
      players: getAllPlayers.call(),
      teams: getAllTeams.call(),
      fixtures: getAllFixtures.call(),
      pairs: getAllPairs.call(),
    });
  });

  const randomIndex = Math.floor(Math.random() * (pairs.length -1));

  const handleCardClick = (correct) => {
    document.getElementById('cards').classList.add('no-click');
    setTimeout(function() {
      if (correct) {
        document.getElementById('cards').classList.remove('no-click');
        setScore(prevScore => prevScore + 1);
        setCounter(prevCounter => prevCounter + 1);
        if (score === 9) {
          setWinMessage('You Win!');
          setWin(true);
          setWinCount(prevWinCount => prevWinCount + 1);
          return;
        }
      } else {
        document.getElementById('cards').classList.remove('no-click');
        setCounter(prevCounter => prevCounter + 1);
      }
    }.bind(this), 1000);
  }

  if (win) {
    setTimeout(function() {
    setWinMessage('');
    setScore(0);
    setCounter(0);
    setWin(false);
    }.bind(this), 1000)
  }

  return (
    <div>
      <header>
        <h1>FPPG (Adi Laiman)</h1>
      </header>
      <div className='scores'>
        <h2>Score: {score}</h2>
        <h2>Guesses: {counter}</h2>
        <h2>Wins: {winCount}</h2>
      </div>
        <div className='cards' id='cards'>
        {pairs.slice(randomIndex-1, randomIndex).map(pair =>
          <PlayerCard key={pair.playerOne._id} player={pair.playerOne} higherFPPG={pair.higherFPPG} teams={teams} fixtures={fixtures} onCardClick={handleCardClick} />
        )}
        {pairs.slice(randomIndex-1, randomIndex).map(pair =>
          <PlayerCard key={pair.playerTwo._id} player={pair.playerTwo} higherFPPG={pair.higherFPPG} teams={teams} fixtures={fixtures} onCardClick={handleCardClick} />
        )}
      </div>
    </div>
  );
};
