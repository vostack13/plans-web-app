import {catchError, map, mergeMap, take, tap} from 'rxjs/operators';
import {from, of, race} from 'rxjs';
import {getSignInFailure, getSignInSuccess, SIGN_IN_GET_CANCELLED, SIGN_IN_GET_REQUEST} from 'app/redux/actions';
import axios from 'axios';
import {config} from 'app/helpers/axios-config';
import {ofType} from 'redux-observable';

export const getSignInEpic = action$ => action$.pipe(
	ofType(SIGN_IN_GET_REQUEST),

	map(action => {
		const source = axios.CancelToken.source();

		return {...action, cancelToken: source}
	}),

	mergeMap(action => race(
		from(axios({
			...config,
			cancelToken: action.cancelToken.token,
			data       : action.payload,
			method     : 'post',
			url        : '/login',
		}))
			.pipe(
				map(response => {
					if (response.status === 200) {
						localStorage.setItem('id_token', response.data.access_key);
	
						return getSignInSuccess(true);
					}
				}),
		
				catchError(error => {
					return of(getSignInFailure(error.response.data.error))},
				),
			),

		action$.pipe(
			ofType(SIGN_IN_GET_CANCELLED),

			tap(() => {
				action.cancelToken.cancel();
			}),

			take(1),
		),
	)),
);
