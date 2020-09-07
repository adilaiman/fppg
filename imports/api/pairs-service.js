import Pairs from './pairs.js'
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const getPair = new ValidatedMethod({
    name: 'pair.getPair',
    validate: new SimpleSchema({
        id: { type: String },
    }).validator(),
    run({ id }) {
        return Pairs.findOne({id});
    }
});

export const getAllPairs = new ValidatedMethod({
    name: 'pair.getAllPairs',
    validate: null,
    run() {
      return Pairs.find({}).fetch();
    }
});