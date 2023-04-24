// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC5uOo87RoQq04t0x7Xyb6o3ataVm7G7WE",
	authDomain: "netcomz.firebaseapp.com",
	projectId: "netcomz",
	storageBucket: "netcomz.appspot.com",
	messagingSenderId: "976055247747",
	appId: "1:976055247747:web:f2f8c8718d2a9af9648cb6",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
