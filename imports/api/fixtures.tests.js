import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';

import Fixtures from './fixtures.js';
import { getFixture, getAllFixtures } from './fixtures-service.js';

if (Meteor.isServer) {
    describe('Fixtures', function() {
        describe('methods', function() {
            let fixture;
            let fixtureId;
            before(() => {
                Fixtures.remove({});
                fixtureId = Fixtures.insert({
                    "_id" : "K7PZt7zs9Ws7uCZkY",
                    "away_team" : {
                            "score" : null,
                            "team" : {
                                    "_members" : [
                                            "703"
                                    ],
                                    "_ref" : "teams.id"
                            }
                    },
                    "home_team" : {
                            "score" : null,
                            "team" : {
                                    "_members" : [
                                            "687"
                                    ],
                                    "_ref" : "teams.id"
                            }
                    },
                    "id" : "112160",
                    "sport" : "NBA",
                    "start_date" : "2016-05-04T02:30:00Z",
                    "status" : null,
                });
                fixture = Fixtures.findOne({});
            });

            describe('fixtures.getFixture', function() {
                it('returns one specific fixture', function(done) {
                    assert.deepEqual(getFixture.call({ _id: fixtureId }), fixture);
                    done();
                });
            });

            describe('fixtures.getAllFixtures', function() {
                it('returns all fixtures in the collection', function(done) {
                    assert.equal(getAllFixtures.call().length, Fixtures.find({}).count());
                    done();
                });
            });
        });
    });
}