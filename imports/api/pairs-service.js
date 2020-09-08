import Pairs from './pairs.js'
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const getPair = new ValidatedMethod({
    name: 'pairs.getPair',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        return Pairs.findOne({ _id });
    }
});

export const getAllPairs = new ValidatedMethod({
    name: 'pairs.getAllPairs',
    validate: null,
    run() {
      return Pairs.find({}).fetch();
    }
});