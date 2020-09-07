import Players from './players.js'
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const getPlayer = new ValidatedMethod({
    name: 'players.getPlayer',
    validate: new SimpleSchema({
        id: { type: String },
    }).validator(),
    run({ id }) {
        return Players.findOne({id});
    }
});

export const getAllPlayers  = new ValidatedMethod({
    name: 'players.getAllPlayers',
    validate: null,
    run() {
      return Players.find({}).fetch();
    }
});