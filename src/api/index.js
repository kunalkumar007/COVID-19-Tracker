import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
	let changeableUrl = url;
	if (country) {
		changeableUrl = `${url}/countries/${country}`;
	}

	try {
		// const response = await axois.get(url);
		// Destructured data down below...
		const {
			data: { confirmed, recovered, deaths, lastUpdate },
		} = await axios.get(changeableUrl);
		//we dont need to return it after destrucuring...
		// return response;
		// we can also destructure the modifiedData furthur..
		/* const modifiedData = {
				confirmed,
				recovered,
				deaths,
				lastUpdate,
			}; */
		return { confirmed, recovered, deaths, lastUpdate };
	} catch (err) {
		console.log(err);
	}
};

export const fetchDailyData = async () => {
	try {
		const { data } = await axios.get(`${url}/daily`);

		const modifiedData = data.map((dailyData) => ({
			confirmed: dailyData.confirmed.total,
			deaths: dailyData.deaths.total,
			date: dailyData.reportDate,
		}));
		return modifiedData;
	} catch (error) {}
};

export const fetchCountries = async () => {
	try {
		const {
			data: { countries },
		} = await axios.get(`${url}/countries`);
		return countries.map((country) => country.name);
	} catch (error) {}
};
