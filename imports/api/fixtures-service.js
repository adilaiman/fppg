import Fixtures from './fixtures.js'
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const getFixture = new ValidatedMethod({
    name: 'fixtures.getFixture',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        return Fixtures.findOne({ _id });
    }
});

export const getAllFixtures = new ValidatedMethod({
    name: 'fixtures.getAllFixtures',
    validate: null,
    run() {
      return Fixtures.find({}).fetch();
    }
});