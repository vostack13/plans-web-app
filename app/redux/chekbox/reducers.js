import {
	CHECKBOX_CHANGE,
} from 'app/redux/actions';

const initialState = {
	status: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
	case CHECKBOX_CHANGE:
		return {
			status: !state.status,
		};
	default:
		return state;
	}
}
