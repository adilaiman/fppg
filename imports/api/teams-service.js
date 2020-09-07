import Teams from './teams.js'
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const getTeam = new ValidatedMethod({
    name: 'teams.getTeam',
    validate: new SimpleSchema({
        id: { type: String },
    }).validator(),
    run({ id }) {
        return Teams.findOne({id});
    }
});

export const getAllTeams = new ValidatedMethod({
    name: 'teams.getAllTeams',
    validate: null,
    run() {
      return Teams.find({}).fetch();
    }
});