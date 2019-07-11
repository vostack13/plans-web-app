import {catchError, map, mergeMap} from 'rxjs/operators';
import {LOGIN_REQUEST, loginUserFailure, loginUserSuccess, logoutUserSuccess, USER_LOGOUT} from '@/redux/actions';
import axios from 'axios';
import {config} from '@/helpers/axios-config';
import {from} from 'rxjs';
import {of} from 'rxjs';
import {ofType} from 'redux-observable';

export const loginUserEpic = action$ => action$.pipe(
	ofType(LOGIN_REQUEST),

	mergeMap(action => from(axios({
		...config,
		data  : action.payload,
		method: 'post',
		url   : '/login',
	})).pipe(
		map(response => {
			if (response.status === 200) {
				localStorage.setItem('id_token', response.data.access_key);
				return loginUserSuccess(true)
			}
		}),
	
		catchError(error => {
			return of(loginUserFailure(error.response.data.error))},
		),
	)),
);

export const logoutUserEpic = action$ => action$.pipe(
	ofType(USER_LOGOUT),

	map(logoutUserSuccess),
);
