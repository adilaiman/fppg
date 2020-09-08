import Players from './players.js'
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

/**
 * @summary returns a specific player
 * @function getPlayer
 * @param {String} _id - player document ID
 * @return {Object} player - player object
 */
export const getPlayer = new ValidatedMethod({
    name: 'players.getPlayer',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        return Players.findOne({ _id });
    }
});

/**
 * @summary returns all players
 * @function getAllPlayers
 * @return {Array} playerArray - an array of player objects
 */
export const getAllPlayers  = new ValidatedMethod({
    name: 'players.getAllPlayers',
    validate: null,
    run() {
      return Players.find({}).fetch();
    }
});