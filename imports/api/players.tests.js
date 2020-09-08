import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';

import Players from './players.js';
import { getPlayer, getAllPlayers } from './players-service.js';

if (Meteor.isServer) {
    describe('Players', function() {
        describe('methods', function() {
            let player;
            let playerId;
            before(() => {
                Players.remove({});
                playerId = Players.insert({
                    "_id" : "BBRzGXAgjxXydQ2fY",
                    "first_name" : "Stephen",
                    "fixture" : {
                            "_members" : [
                                    "112160"
                            ],
                            "_ref" : "fixtures.id"
                    },
                    "fppg" : 47.94303797468354,
                    "id" : "15475-9524",
                    "images" : {
                            "default" : {
                                    "height" : 200,
                                    "url" : "https://d17odppiik753x.cloudfront.net/playerimages/nba/9524.png",
                                    "width" : 200
                            }
                    },
                    "injured" : false,
                    "injury_details" : "knee",
                    "injury_status" : "o",
                    "last_name" : "Curry",
                    "news" : {
                            "latest" : "2016-05-02T18:35:15Z"
                    },
                    "played" : 79,
                    "player_card_url" : "https://www.fanduel.com/e/Player/9524/Stats/15475",
                    "position" : "PG",
                    "removed" : false,
                    "salary" : 10600,
                    "starting_order" : null,
                    "team" : {
                            "_members" : [
                                    "687"
                            ],
                            "_ref" : "teams.id"
                    },
                });
                player = Players.findOne({});
            });

            describe('players.getPlayer', function() {
                it('returns one specific player', function(done) {
                    assert.deepEqual(getPlayer.call({ _id: playerId }), player);
                    done();
                });
            });

            describe('players.getAllPlayers', function() {
                it('returns all players in the collection', function(done) {
                    assert.equal(getAllPlayers.call().length, Players.find({}).count());
                    done();
                });
            });
        });
    });
}