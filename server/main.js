import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

import Fixtures from '/imports/api/fixtures';
import Players from '/imports/api/players';
import Teams from '/imports/api/teams';
import Pairs from '/imports/api/pairs';

function insertIntoCollections(data) {
    const keys = Object.keys(data);
    keys.splice(0,1);

    keys.forEach(key => {
        if (key === 'fixtures') {
        data[key].forEach(entry => {
            Fixtures.insert(entry);
        });
        } else if (key === 'players') {
        data[key].forEach(entry => {
            Players.insert(entry);
        });
        } else if (key === 'teams') {
        data[key].forEach(entry => {
            Teams.insert(entry);
        });
        } else {
        return;
        }
    });
}

const url = 'https://gist.githubusercontent.com/liamjdouglas/bb40ee8721f1a9313c22c6ea0851a105/raw/6b6fc89d55ebe4d9b05c1469349af33651d7e7f1/Player.json';

Meteor.startup(() => {

    Players.remove({});
    Teams.remove({});
    Fixtures.remove({});
    Pairs.remove({});

    // if there is no data in the collections, fetch JSON and insert into collection
    if (Players.find({}).fetch().length === 0) {
        const myJSON = JSON.parse(HTTP.call('GET', url).content);
        insertIntoCollections(myJSON);
    }

    // take players collection and make a unique pairings for all players
    if (Pairs.find({}).fetch().length === 0) {
        const players = Players.find({}).fetch();
        for (let i=0; i < players.length; i++) {
            for (let j=i+1; j < players.length; j++) {
                Pairs.insert({
                    playerOne: players[i],
                    playerTwo: players[j],
                });
            }
        }
    }

    // take each pair and add a field to display id of player with higher fppg score
    const pairs = Pairs.find({}).fetch();
    for (let pair of pairs) {
        const { playerOne, playerTwo } = pair;
        const higherFPPG = playerOne.fppg > playerTwo.fppg ? playerOne._id : playerTwo._id;
        Pairs.update(pair._id, { $set: { higherFPPG } });
    }
});
