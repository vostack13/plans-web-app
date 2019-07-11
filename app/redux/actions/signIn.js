import {
	SIGN_IN_GET_CANCELLED,
	SIGN_IN_GET_FAILURE,
	SIGN_IN_GET_REQUEST,
	SIGN_IN_GET_SUCCESS,
} from './';

export const getSignInRequest = dataForm => {
	return {
		payload: dataForm,
		type   : SIGN_IN_GET_REQUEST,
	}
};

export const getSignInSuccess = response => {
	return {
		payload: response,
		type   : SIGN_IN_GET_SUCCESS,
	}
};

export const getSignInFailure = response => {
	return {
		payload: response,
		type   : SIGN_IN_GET_FAILURE,
	}
};

export const getSignInCancelled = () => {
	return {
		type: SIGN_IN_GET_CANCELLED,
	}
};
