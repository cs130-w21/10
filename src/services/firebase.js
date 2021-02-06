import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDT2az1B1ZVbAGzxokouCmSXfU6cEPCxmk",
    authDomain: "capitalist-hinge.firebaseapp.com",
    databaseURL: "https://capitalist-hinge-default-rtdb.firebaseio.com",
    projectId: "capitalist-hinge",
    storageBucket: "capitalist-hinge.appspot.com",
    messagingSenderId: "1024972331185",
    appId: "1:1024972331185:web:f43e8a1356ca2fe4deea90",
    measurementId: "G-0M52DMCW52"
};
firebase.initializeApp(firebaseConfig);


const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            console.log('signInSuccess Callback')
            return true;
        },
        uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            // document.getElementById('loader').style.display = 'none';
            console.log('uiShown callback func')
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO',
    // Privacy policy url.
    privacyPolicyUrl: 'https://www.youtube.com/watch?v=y6120QOlsfU&ab_channel=Darude'
};


// Makes sure basic App.test.js test passes due to authorization persistence type
// https://github.com/firebase/firebaseui-web/issues/636
export const startFirebaseUI = function (elementId) {
    // Set up firebaseUI
    firebase
    .auth()
    // can set session if remember me option exists
    .setPersistence(process.env.NODE_ENV === 'test' ? firebase.auth.Auth.Persistence.NONE : firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        // get the firebaseui instance
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
        ui.start(elementId, uiConfig)
    })
};

export function getCurrentUser() {
    return firebase.auth().currentUser;
}

export default firebase.database();