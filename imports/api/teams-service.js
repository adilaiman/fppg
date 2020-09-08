import Teams from './teams.js'
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

/**
 * @summary returns a specific team
 * @function getTeam
 * @param {String} _id - team document ID
 * @return {Object} team - team object
 */
export const getTeam = new ValidatedMethod({
    name: 'teams.getTeam',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        return Teams.findOne({ _id });
    }
});

/**
 * @summary returns all teams
 * @function getAllTeams
 * @return {Array} teamsArray - an array of team objects
 */
export const getAllTeams = new ValidatedMethod({
    name: 'teams.getAllTeams',
    validate: null,
    run() {
      return Teams.find({}).fetch();
    }
});