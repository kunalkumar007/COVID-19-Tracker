import React from 'react';
import { Chart, Cards, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api/index';
import logo from "./images/image.png"

class App extends React.Component {
	state = {
		data: {},
		country: '',
	};
	async componentDidMount() {
		const fetchedData = await fetchData();
		this.setState({ data: fetchedData });
	}
	handleCountryChange = async (country) => {
		const fetchedData = await fetchData(country);
		this.setState({ data: fetchedData, country: country });
	};

	render() {
		const { data, country } = this.state;
		return (
			<React.Fragment>
				<div className={styles.container}>
					<img src={logo} className={styles.image} alt="Logo"/>
					<Cards data={data} />
					<CountryPicker handleCountryChange={this.handleCountryChange} />
					<Chart data={data} country={country} />
				</div>
			</React.Fragment>
		);
	}
}

export default App;
