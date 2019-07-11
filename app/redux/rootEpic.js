import {combineEpics} from 'redux-observable';
import {getSignInEpic} from './signIn/epic';

export default combineEpics(
	getSignInEpic,
);
