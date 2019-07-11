import {applyMiddleware, compose, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import rootEpic from './rootEpic';
import rootReducer from './rootReducer';

const epicMiddleware = createEpicMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
	const store = createStore(
		rootReducer,

		composeEnhancer(
			applyMiddleware(
				epicMiddleware,
			),
		),
	);

	epicMiddleware.run(rootEpic);

	return store;
}
