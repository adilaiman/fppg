import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

import Teams from './teams.js';
import { getTeam, getAllTeams } from './teams-service.js';
import { teamsData } from './testData.js';

if (Meteor.isServer) {
    describe('Teams', function() {
        describe('publications', function() {
            let team;
            let teamId;
            before(() => {
                Teams.remove({});
                teamId = Teams.insert(teamsData);
                team = Teams.findOne({});
            });

            describe('teams', function() {
                it('sends all teams', function(done) {
                    const collector = new PublicationCollector();
                    collector.collect('teams', function(collections) {
                        assert.equal(collections.teams.length, 1);
                        done();
                    });
                });
            });
        });

        describe('methods', function() {
            let team;
            let teamId;
            before(() => {
                Teams.remove({});
                teamId = Teams.insert(teamsData);
                team = Teams.findOne({});
            });

            describe('teams.getTeam', function() {
                it('returns one specific team', function(done) {
                    assert.deepEqual(getTeam.call({ _id: teamId }), team);
                    done();
                });
            });

            describe('teams.getAllTeams', function() {
                it('returns all teams in the collection', function(done) {
                    assert.equal(getAllTeams.call().length, Teams.find({}).count());
                    done();
                });
            });
        });
    });
}