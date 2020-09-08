import { Mongo } from 'meteor/mongo';

export default Pairs = new Mongo.Collection('pairs');

if (Meteor.isServer) {
    Meteor.publish('pairs', function() { return Pairs.find() })
}