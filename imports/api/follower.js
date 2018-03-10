import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export const Token = new Mongo.Collection("token")

Meteor.methods({
	"user.insert"(screen_name, followers, length) {
		console.log(screen_name, followers, length)
		return Token.insert({ screen_name: screen_name, followers: followers, length: length })
	},
	"get.followers"(screen_name) {
		return Token.findOne({ screen_name })
	}
})