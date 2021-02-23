import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
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
export const storage = firebase.storage();
// Options is an object with uid, photo, name, phone, email
export const createNewUser = async (options) => {
	return db.ref('Users/' + options.uid).set({
		likedBy: [
			'uid1',
			'uid2'
		],
		likes: [
			'uid1',
			'uid2'
		],
		personalInfo: {
			profilePicture: options.photo,
			areaOfExpertise: [],
			education: '',
			name: options.name,
			work: ''
		},
		contactInfo: {
			email: options.email,
			linkedin: '',
			phone: options.phone
		},
		dontShow: [],
		interests: [],
	})
};

export function getCurrentUser() {
    return firebase.auth().currentUser;
}
