import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import appConfig from './twitterConfig'
import Token from '../../api/follower'

Meteor.methods({
	async "get_followers"(screen_name) {
		let followers = [];
		let count = 0
		let next_cursor = -1
		try{
			while(count < 400){
				let data = await appConfig.get('followers/list', { screen_name: screen_name , count : 200 ,cursor : next_cursor} );
				// console.log(data.data)
				if(data.data.users){	
					data.data.users.forEach(function(user){
						followers.push(user)
					})
				}
				console.log("pushed 200")
				count += 200
			}
			return followers
		}
		catch(err){
			throw new Meteor.Error("API error")
		}

		// while(count < 1000){
		// 	await appConfig.get('followers/list', { screen_name: screen_name , count : 200 ,cursor : next_cursor},  function (err, data, response) {
		// 		console.log(response.caseless.dict['x-rate-limit-remaining'])
		// 		next_cursor = data.next_cursor;
		// 		if(data.users){	
		// 			data.users.forEach(function(user){
		// 				followers.push(user)
		// 			})
		// 		}
		// 	})
		// 	count += 200;
		// 	if(count >= 1000){
		// 		console.log(followers.length)
		// 		return followers
		// 	}
		// }
	}
})