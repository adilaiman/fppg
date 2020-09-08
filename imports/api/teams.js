import { Mongo } from 'meteor/mongo';

export default Teams = new Mongo.Collection('teams');

if (Meteor.isServer) {
    Meteor.publish('teams', function() { return Teams.find() })
}