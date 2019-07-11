import {changeCheckbox, getSignInCancelled, getSignInRequest} from 'app/redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';

const Main = () => {
	const statusCheckbox = useSelector(state => state.checkbox.status);
	const dispatch = useDispatch();

	const submitLogin = event => {
		event.preventDefault();

		dispatch(getSignInRequest({
			email   : 'admin',
			password: '123',
		}));
	}

	const cancelLogin = () => {
		event.preventDefault();

		dispatch(getSignInCancelled());
	}

	return <div>
		<form action="/" method='get' onSubmit={submitLogin}>
			{/* <Icons /> */}

			<p>
				<label>
					<span>Email</span>
					<input type="text" />
				</label>
			</p>

			<p>
				<label>
					<span>Password</span>
					<input type="text" />
				</label>
			</p>

			<p>
				<label>
					<input
						type="checkbox"
						value={statusCheckbox}
						onChange={() => dispatch(changeCheckbox())}
					/>

					<span>Оставаться в системе</span>
				</label>
			</p>

			<p>
				<button type="submit">Войти</button>
				<button type="reset" onClick={cancelLogin}>Отмена</button>
			</p>
		</form>
	</div>
}

export default Main;
