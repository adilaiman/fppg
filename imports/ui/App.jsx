import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import Players from '/imports/api/players';
import Teams from '/imports/api/teams';
import Fixtures from '/imports/api/fixtures';

import { PlayerCard } from './PlayerCard';

export const App = () => {
  const { players, teams, fixtures} = useTracker(() => {
    return ({
      players: Players.find({}, { sort: {'team._members': 1} }).fetch(),
      teams: Teams.find({}).fetch(),
      fixtures: Fixtures.find({}).fetch(),
    });
  });


  return (
    <div>
      <h1>FPPG Game</h1>
      {players.map(player => <PlayerCard key={player._id} player={player} teams={teams} fixtures={fixtures} />)}
    </div>
  );
};
