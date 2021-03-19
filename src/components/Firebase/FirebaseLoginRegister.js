import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './config';

if(firebase.apps.length===0){
    firebase.initializeApp(firebaseConfig);
}

export const googleSignIn = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            return user;
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            return errorMessage;
        });
}