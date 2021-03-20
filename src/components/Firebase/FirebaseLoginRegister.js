import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './config';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export const googleSignIn = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            const user = result.user;
            return user;
        }).catch((error) => {
            const errorMessage = error.message;
            return errorMessage;
        });
}

export const emailSignIn = (email, password) => {
    return firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => res)
        .catch(err => err)
}

export const createAccount = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => res)
        .catch(error => error);
}