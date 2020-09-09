import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

import Players from './players.js';
import { getPlayer, getAllPlayers } from './players-service.js';
import { playersData } from './testData.js';

if (Meteor.isServer) {
    describe('Players', function() {
        describe('publications', function() {
            let player;
            let playerId;
            before(() => {
                Players.remove({});
                playerId = Players.insert(playersData);
                player = Players.findOne({});
            });

            describe('players', function() {
                it('sends all players', function(done) {
                    const collector = new PublicationCollector();
                    collector.collect('players', function(collections) {
                        assert.equal(collections.players.length, 1);
                        done();
                    });
                });
            });
        });

        describe('methods', function() {
            let player;
            let playerId;
            before(() => {
                Players.remove({});
                playerId = Players.insert(playersData);
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