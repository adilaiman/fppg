import Players from './players.js'
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const getPlayer = new ValidatedMethod({
    name: 'players.getPlayer',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        return Players.findOne({ _id });
    }
});

export const getAllPlayers  = new ValidatedMethod({
    name: 'players.getAllPlayers',
    validate: null,
    run() {
      return Players.find({}).fetch();
    }
});