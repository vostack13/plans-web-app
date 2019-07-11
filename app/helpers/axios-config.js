import axios from 'axios';

export const config = {
	baseURL: 'http://localhost:3020',
	
	headers: {
		'Content-Type': 'application/json',
	},
	
	// baseURL: 'https://lk.toweco.ru:3000',
};

export const axiosInstanceGlobal = axios.create(config);
