import React, { Component } from 'react'
import ReactTable from 'react-table'
import './Table.css'


export default class Table extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		let data = this.props.followers
		return(
			
			<table>
			<tr>
			<th>S.NO.</th>
			<th>ID</th>
			<th>NAME</th>
			<th>SCREEN NAME</th>
			<th>LOCATION</th>
			<th>FRIENDS COUNT</th>
			<th>FOLLOWERS COUNT</th>
			</tr>

			{data.map((follower, k) => {
				return(
					<tr key = {k}>
					<td>{k+1}</td>
					<td>{follower.id}</td>
					<td>{follower.name}</td>
					<td>{follower.screen_name}</td>
					<td>{follower.location}</td>
					<td>{follower.friends_count}</td>
					<td>{follower.followers_count}</td>

					</tr>
					)
			})}
			</table>
			)
		}
	}