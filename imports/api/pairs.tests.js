import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';

import Pairs from './pairs.js';
import { getPair, getAllPairs } from './pairs-service.js';

if (Meteor.isServer) {
    describe('Pairs', function() {
        describe('methods', function() {
            let pair;
            let pairId;
            before(() => {
                Pairs.remove({});
                pairId = Pairs.insert({
                    "_id" : "N88xR2WxjGwp4baLo",
                    "playerOne" : {
                            "_id" : "K8B6Q5JPmxFkaiCj9",
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
                            }
                    },
                    "playerTwo" : {
                            "_id" : "Hoqgd46745EuwKcJH",
                            "first_name" : "Draymond",
                            "fixture" : {
                                    "_members" : [
                                            "112160"
                                    ],
                                    "_ref" : "fixtures.id"
                            },
                            "fppg" : 38.9604938271605,
                            "id" : "15475-15860",
                            "images" : {
                                    "default" : {
                                            "height" : 200,
                                            "url" : "https://d17odppiik753x.cloudfront.net/playerimages/nba/15860.png",
                                            "width" : 200
                                    }
                            },
                            "injured" : false,
                            "injury_details" : null,
                            "injury_status" : null,
                            "last_name" : "Green",
                            "news" : {
                                    "latest" : "2016-05-02T01:24:54Z"
                            },
                            "played" : 81,
                            "player_card_url" : "https://www.fanduel.com/e/Player/15860/Stats/15475",
                            "position" : "PF",
                            "removed" : false,
                            "salary" : 9300,
                            "starting_order" : null,
                            "team" : {
                                    "_members" : [
                                            "687"
                                    ],
                                    "_ref" : "teams.id"
                            }
                    },
                    "higherFPPG" : "K8B6Q5JPmxFkaiCj9"
                });
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