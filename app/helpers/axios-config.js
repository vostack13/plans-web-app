import axios from 'axios';

export const config = {
	baseURL: 'http://localhost:3020',
	
	headers: {
		'Content-Type': 'application/json',
	},
};

export const axiosInstanceGlobal = axios.create(config);
