import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { PlayerCard } from './PlayerCard';
import { getAllFixtures } from '/imports/api/fixtures-service.js';
import { getAllPairs } from '/imports/api/pairs-service.js';
import { getAllPlayers } from '/imports/api/players-service.js';
import { getAllTeams } from '/imports/api/teams-service.js';


export const App = () => {

  // set state vars
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState(0);
  const [win, setWin] = useState(false);
  const [winCount, setWinCount] = useState(0);

  // tracker to update collection data on change
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

  // handles card click event
  const handleCardClick = (correct) => {
    document.getElementById('cards').classList.add('no-click');
    setTimeout(function() {
      if (correct) {
        document.getElementById('cards').classList.remove('no-click');
        setScore(prevScore => prevScore + 1);
        setGuesses(prevGuess => prevGuess + 1);
        if (score === 9) {
          setWin(true);
          setWinCount(prevWinCount => prevWinCount + 1);
          return;
        }
      } else {
        document.getElementById('cards').classList.remove('no-click');
        setGuesses(prevGuess => prevGuess + 1);
      }
    }.bind(this), 1000);
  }

  // resets stats if player wins
  if (win) {
    setTimeout(function() {
    setScore(0);
    setGuesses(0);
    setWin(false);
    }.bind(this), 1000)
  }

  // gets a random integer to be used in randoming a pair of players
  const randomIndex = Math.floor(Math.random() * (pairs.length -1));

  return (
    <div>
      <header>
        <h1>FPPG (Adi Laiman)</h1>
      </header>
      <div className='scores'>
        <h3>Score: {score}</h3>
        <h3>Guesses: {guesses}</h3>
        <h3>Wins: {winCount}</h3>
      </div>
        <div id='cards' className='cards'>
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
