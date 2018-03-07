import React, { Component } from 'react';
import Header from './Header';
import DataTable from './DataTable';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			search: '',
			currentInput: '',
			data: {}
		}
	}
	
	render() {
    	return (
			<React.Fragment>
				<Header
					currentInput={this.state.currentInput}
					clickHandler={this._searchClickHandler}
					changeHandler={this._searchChangeHandler}
				/>
				<div className="message">
					{this.state.message}
				</div>
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
		console.log(currentInput);
		fetch('http://localhost:4000/scrape', {
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
					message: data.message,
					data: {}
				});
			} else {
				this.setState({
					message: '',
					search: currentInput,
					currentInput: '',
					data: data
				});
			}
		});
	}
}

export default App;
