import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import Table from '../../ui/Table'

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: "",
			followers: null
		}
	}

	search() {
		Meteor.call("get_followers", this.state.query, (err, res) => {
			if(err)
				console.log("err in getting followers : ", err)
			else{
				console.log("got the followers", res.length)
				Meteor.call("user.insert", this.state.query, res, res.length, (err, res) => {
					if(err)
						console.log(err)
					else{
						console.log("user inserted", res)
						this.setState({followers: res})
					}
				})
			}
		})
	}

	render() {
		return(
			<div>
			<FormGroup>
			<InputGroup>
			<FormControl
			type = "text"
			placeholder = "Search for an person"
			value = {this.state.query}
			onChange = {event => {this.setState({query: event.target.value});}}
			onKeyPress = { event => {
				if(event.key === 'Enter'){
					this.search();
				}
			}}
			/>
			<InputGroup.Addon className =  "searchButton" onClick = {() => this.search()}>
			<Glyphicon glyph = "search"></Glyphicon>
			</InputGroup.Addon>
			</InputGroup>
			</FormGroup>
			{
				this.state.followers !== null ?
				<Table
				followers = {this.state.followers}
				/>
				: 
				<div></div>
			}
			</div>
			)
	}

}


Meteor.startup(() => {
	ReactDOM.render(<App />, document.querySelector('.render-target'))
})