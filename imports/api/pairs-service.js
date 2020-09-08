import Pairs from './pairs.js'
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

/**
 * @summary returns a specific pair
 * @function getPair
 * @param {String} _id - pair document ID
 * @return {Object} pair - pair object
 */
export const getPair = new ValidatedMethod({
    name: 'pairs.getPair',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        return Pairs.findOne({ _id });
    }
});

/**
 * @summary returns all pairs
 * @function getPairs
 * @return {Array} pairArray - an array of pair objects
 */
export const getAllPairs = new ValidatedMethod({
    name: 'pairs.getAllPairs',
    validate: null,
    run() {
      return Pairs.find({}).fetch();
    }
});