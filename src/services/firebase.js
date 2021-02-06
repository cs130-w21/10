import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

export const auth = firebase.auth;
export const db = firebase.database();
export const createNewUser = async (uid, name, photo, email, phone) => {
	return db.ref('Users/' + uid).set({
		likedBy: [
			'uid1',
			'uid2'
		],
		likes: [
			'uid1',
			'uid2'
		],
		personalInfo: {
			profilePicture: photo,
			areaOfExpertise: [],
			education: '',
			name: name,
			work: ''
		},
		contactInfo: {
			email: email,
			linkedin: '',
			phone: phone
		},
		dontShow: [],
		interests: [],
	})
};

export const getUserData = (uid) => {
    db.ref('Users/' + uid).on('value', (snapshot) => {
        return snapshot.val();
    });
}