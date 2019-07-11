import {catchError, map, mergeMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {getSignInFailure, getSignInSuccess, SIGN_IN_GET_REQUEST} from 'app/redux/actions';
import axios from 'axios';
import {config} from 'app/helpers/axios-config';
import {ofType} from 'redux-observable';

export const getSignInEpic = action$ => action$.pipe(
	ofType(SIGN_IN_GET_REQUEST),

	mergeMap(action => from(axios({
		...config,
		data  : action.payload,
		method: 'post',
		url   : '/login',
	})).pipe(
		map(response => {
			if (response.status === 200) {
				localStorage.setItem('id_token', response.data.access_key);

				return getSignInSuccess(true);
			}
		}),
	
		catchError(error => {
			return of(getSignInFailure(error.response.data.error))},
		),
	)),
);

// export const logoutUserEpic = action$ => action$.pipe(
// 	ofType(USER_LOGOUT),

// 	map(logoutUserSuccess),
// );
