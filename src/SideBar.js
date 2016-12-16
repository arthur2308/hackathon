import React, { Component } from 'react';
import $ from 'jquery';
import App from './App';

class SideBar extends Component {
	constructor() {
		super();
		this.styles = {
			'position': 'fixed',
			'height' : '300px',
			'width': '50px',
			'right': '0',
			'bottom' : '30%',
			'display': 'flex',
			'flexDirection' : 'column'
		};
	}

	handleClickSearch(event) {
		$('#search').toggleClass('sidebar-icon');
		// $('#search').toggleClass('sidebar-icon-clicked');
		console.log("Search clicked!");
	}

	handleClickTrending(event) {

	}

	render() {
		return (
			<div style={this.styles}>
				<div className="sidebar-icon" onClick={this.handleClickSearch} id="search">
					<i className="fa fa-search" aria-hidden="true"></i>
				</div>
				<div className="sidebar-icon" style={{'backgroundColor':'blue'}} onClick={this.handleClickTrending}>
					<i className="fa fa-signal" aria-hidden="true"></i>
				</div>
			</div>
		)
	}
}

export default SideBar;