import React, { Component } from 'react'

export default class Table extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		console.log("props", this.props)
		return(
			<div>gotcha</div>
		)
	}
}