import React, { Component } from 'react';
import Header from './Header';
import DataTable from './DataTable';
import Loader from './Loader';
import Message from './Message';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			message: 'Welcome to First Blood.\nHere you can enter your summoner name during the League of Legends loading screen (or during the match) to get some info that can give you the winning edge.',
			search: '',
			currentInput: '',
			data: null,
			toggle: "game"
		}
	}
	
	render() {
    	return (
			<React.Fragment>
				<Header
					currentInput={this.state.currentInput}
					clickHandler={this._searchClickHandler}
					changeHandler={this._searchChangeHandler}
					toggleHandler={this._toggleHandler}
					toggle={this.state.toggle}
				/>
				<Message
					message={this.state.message}
				/>
				<Loader
					loading={this.state.loading}
				/>
				<main>
					<DataTable
						search={this.state.search}
						data={this.state.data}
					/>
				</main>
				<footer>
            		<div className="credit">Andrew Keller 2018</div>
            		<a className="github" href="https://github.com/Vurolock/firstblood/" target="_blank" rel="noopener noreferrer"><img src="./images/github-logo.png" alt='' /></a>
        		</footer>	
			</React.Fragment>
		);
	}

	_searchChangeHandler = (currentInput) => {
		this.setState({
			currentInput: currentInput
		});
	}

	_searchClickHandler = (currentInput) => {
		this.setState({
			loading: true,
			message: null,
			data: null
		}, () => {
			fetch('/', {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json'}),
				body: JSON.stringify({
					name: currentInput
			})
		}).then(res => res.json())
		.then(data => {
			if (data.message) {
				this.setState({
					loading: false,
					message: data.message,
					data: null
				});
			} else {
				this.setState({
					message: null,
					loading: false,
					search: currentInput,
					currentInput: '',
					data: data
				});
			}
		});
		});
	}

	_toggleHandler = (toggled) => {
		this.setState({
			toggle: toggled
		});
	}
}

export default App;
