import React from 'react';
import { startFirebaseUI } from '../../services/firebase';

class Login extends React.Component {
	componentDidMount() {
		startFirebaseUI('#firebaseui-auth-container');
	}

	render() {
		return (
			<div>
				<h1>Capitalist Hinge</h1>
				<div id="firebaseui-auth-container"></div>
			</div>
		);
	}
}

export default Login;