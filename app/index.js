import Icons from 'app/common/sv-ui/Icons';
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
	return <div>
		<h1>Hello, world!</h1>

		<p>
			<Icons />
		</p>
	</div>
}

ReactDOM.render(
	<App />,
	document.getElementById('root'),
);
