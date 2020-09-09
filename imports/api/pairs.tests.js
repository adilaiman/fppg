import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

import Pairs from './pairs.js';
import { getPair, getAllPairs } from './pairs-service.js';
import { pairsData } from './testData.js';

if (Meteor.isServer) {
    describe('Pairs', function() {
        describe('publications', function() {
            let pair;
            let pairId;
            before(() => {
                Pairs.remove({});
                pairId = Pairs.insert(pairsData);
                pair = Pairs.findOne({});
            });

            describe('pairs', function() {
                it('sends all pairs', function(done) {
                    const collector = new PublicationCollector();
                    collector.collect('pairs', function(collections) {
                        assert.equal(collections.pairs.length, 1);
                        done();
                    });
                });
            });
        });

        describe('methods', function() {
            let pair;
            let pairId;
            before(() => {
                Pairs.remove({});
                pairId = Pairs.insert(pairsData);
                pair = Pairs.findOne({});
            });

            describe('pairs.getPair', function() {
                it('returns one specific pair', function(done) {
                    assert.deepEqual(getPair.call({ _id: pairId }), pair);
                    done();
                });
            });

            describe('pairs.getAllPairs', function() {
                it('returns all pairs in the collection', function(done) {
                    assert.equal(getAllPairs.call().length, Pairs.find({}).count());
                    done();
                });
            });
        });
    });
}