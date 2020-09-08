import Fixtures from './fixtures.js'
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

/**
 * @summary returns a specific fixture
 * @function getFixture
 * @param {String} _id - fixture document ID
 * @return {Object} fixture - fixture object
 */
export const getFixture = new ValidatedMethod({
    name: 'fixtures.getFixture',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        return Fixtures.findOne({ _id });
    }
});

/**
 * @summary returns all fixtures 
 * @function getAllFixtures
 * @return {Array} fixturesArray - an array of fixture objects
 */
export const getAllFixtures = new ValidatedMethod({
    name: 'fixtures.getAllFixtures',
    validate: null,
    run() {
      return Fixtures.find({}).fetch();
    }
});