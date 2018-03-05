import React, { Component } from 'react';
import Header from './Header';
import DataTable from './DataTable';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentInput: '',
			search: '',
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
				<main>
					<DataTable
						data={this.state.data}
					/>
				</main>	
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
			search: currentInput,
			currentInput: ''
		});
	}


}

export default App;
