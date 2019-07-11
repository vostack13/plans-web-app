import Main from './Main';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';

ReactDOM.render(
	<Provider store={store()}>
		<Main />
	</Provider>,

	document.getElementById('root'),
);
