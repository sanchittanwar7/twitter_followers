import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import appConfig from './twitterConfig'
import Token from '../../api/follower'


Meteor.methods({
	async "get_followers"(screen_name) {
		let count = 0
		let next_cursor = -1
		let followers = []
		await fecthing_details()

		function fecthing_details(){

			appConfig.get('followers/list', { screen_name: screen_name , count : 6 ,cursor : next_cursor},  function (err, data, response) {
				// console.log(data)	
				count += 6
				if(data.users){	
					data.users.forEach(function(user){
						followers.push(user)
					})
				}
				if(response.caseless.dict['x-rate-limit-remaining']>0 && count < 10){
					next_cursor = data.next_cursor
					fecthing_details()
				}
				else{
					if(count < 10)
					{
						var time = new Date().getTime()
						var timestamp = response.caseless.dict['x-rate-limit-reset']
						console.log(timestamp*1000)
						console.log(time)
						console.log((timestamp*1000)-time)
						setTimeout(fecthing_details,(timestamp*1000)-time);
					}
					else{
						console.log("followers", followers.length)
						
					}
				}
			})
		}
		return followers
	}
})