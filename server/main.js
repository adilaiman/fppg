import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

import Fixtures from '/imports/api/fixtures';
import Players from '/imports/api/players';
import Teams from '/imports/api/teams';

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
    if (Players.find({}).fetch().length === 0) {
        const myJSON = JSON.parse(HTTP.call('GET', url).content);
        insertIntoCollections(myJSON);
    }
});
