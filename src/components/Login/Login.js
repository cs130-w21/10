import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import { auth, createNewUser} from '../../services/firebase'
import * as firebaseui from 'firebaseui';


// Makes sure basic App.test.js test passes due to authorization persistence type
// https://github.com/firebase/firebaseui-web/issues/636


const uiConfig = {
	callbacks: {
		signInSuccessWithAuthResult: function(authResult, redirectUrl) {
			// User successfully signed in.
			// Return type determines whether we continue the redirect automatically
			// or whether we leave that to developer to handle.
			console.log(authResult)

			// If new user, create new user in DB. Then read the User object
			// from database and hold in context.
			if (authResult.additionalUserInfo.isNewUser) {
				const [uid, name, photo, email, phone] = [
					authResult.user.uid,
					authResult.user.displayName,
					authResult.user.photoURL,
					authResult.user.email,
					authResult.user.phoneNumber
				];
				let userOptions = {
					uid,
					name,
					photo,
					email,
					phone
				};
				createNewUser(userOptions)
				.then(() => {
					// redirect after creating new user.
					// @jordan change this if necessary to whatever path you need
					window.location.assign('/complete-your-profile')
				}).catch((err) => {
					console.log(err);
					throw(err);
				});
			}      
			return false;
		}
	},
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow: 'popup',
	signInOptions: [
		// Leave the lines as is for the providers you want to offer your users.
		auth.GoogleAuthProvider.PROVIDER_ID,
		// firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		// firebase.auth.TwitterAuthProvider.PROVIDER_ID,
		// firebase.auth.GithubAuthProvider.PROVIDER_ID,
		auth.EmailAuthProvider.PROVIDER_ID,
		// firebase.auth.PhoneAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO',
	// Privacy policy url.
	privacyPolicyUrl: 'https://www.youtube.com/watch?v=y6120QOlsfU&ab_channel=Darude'
};

const startFirebaseUI = (elementId) => {
	// Set up firebaseUI
	auth()
	// can set as session if remember me option exists
	.setPersistence(process.env.NODE_ENV === 'test' ? auth.Auth.Persistence.NONE : auth.Auth.Persistence.LOCAL)
	.then(() => {
		// get the firebaseui instance
		const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth())
		ui.start(elementId, uiConfig)
	})
};

/**
 * @class
 * @classdesc Component to render Login page
 * @extends React.Component
 * @summary When rendering the component, it first checks if there is already a logged-in user.
 * If so, it redirects the user to the page they may have been originally trying to go to (or the home page by default).
 * If there is no user, then it renders the login page using FirebaseUI.
 */
const Login = () => {

	const { uid, loading } = useAuth()
	let location = useLocation();

	let { from } = location.state || { from: { pathname : '/' } };

	if (!loading) {
		if (!uid) {
			startFirebaseUI('#firebaseui-auth-container');
			return (
				<div>
					<h1>Login</h1>
					<div id="firebaseui-auth-container"></div>
				</div>
			);
		} else {
			return (<Redirect to={ from }/>)
		}
	} else {
		return (<div>Loading</div>)
	}
};

export default Login;