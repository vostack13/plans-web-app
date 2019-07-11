import {
	SIGN_IN_GET_FAILURE,
	SIGN_IN_GET_REQUEST,
	SIGN_IN_GET_SUCCESS,
} from 'app/redux/actions';

const initialState = {
	data     : null,
	error    : null,
	isLoading: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
	case SIGN_IN_GET_REQUEST:
		return {
			...state,
			isLoading: true,
		};
	case SIGN_IN_GET_SUCCESS:
		return {
			...state,
			data: action.payload,
		};
	case SIGN_IN_GET_FAILURE:
		return {
			...state,
			error: action.payload,
		};
	default:
		return state;
	}
}
