import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './config';
import profileImage from '../../images/peopleicon.png';

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

    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const signInUser = userCredential.user;
            const { displayName, email } = signInUser;
            const newSignInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                img: profileImage,
                errorLogin: ''
            }
            return newSignInUser;
        })
        .catch((error) => {
            const errorMessage = error.message;
            const newError = { errorLogin: errorMessage }
            return newError;

        });
}

export const createAccount = (name , email, password) => {
    console.log(name , email , password);
    return firebase.auth().createUserWithEmailAndPassword(name , email, password)
        .then((userCredential) => {
            updateUserName(name);
            const signInUser = userCredential.user;
            const { displayName, email } = signInUser;
            const newSignInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                img: profileImage,
                errorLogin: ''
            }
            return newSignInUser;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });
}

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('Updated Successfully');
        }).catch(function (error) {
            console.log(error)
        });
    }