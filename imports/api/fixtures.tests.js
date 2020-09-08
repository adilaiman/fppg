import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';

import Fixtures from './fixtures.js';
import { getFixture, getAllFixtures } from './fixtures-service.js';
import { fixturesData } from './testData.js';

if (Meteor.isServer) {
    describe('Fixtures', function() {
        describe('methods', function() {
            let fixture;
            let fixtureId;
            before(() => {
                Fixtures.remove({});
                fixtureId = Fixtures.insert(fixturesData);
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