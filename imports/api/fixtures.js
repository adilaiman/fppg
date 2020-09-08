import { Mongo } from 'meteor/mongo';

export default Fixtures = new Mongo.Collection('fixtures');

if (Meteor.isServer) {
    Meteor.publish('fixtures', function() { return Fixtures.find({}) })
}