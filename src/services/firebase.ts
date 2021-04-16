import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';

const EMAIL_FOR_SIGN_IN_KEY = 'emailForSignIn';
const LOGGED_IN_KEY = 'loggedIn';
const LOGGED_IN_VALUE = 'y';

const isBrowser = () => typeof window !== 'undefined';

export const getEnteredEmail = () => isBrowser() && window.localStorage.getItem(EMAIL_FOR_SIGN_IN_KEY);
export const setEnteredEmail = (email: string) => isBrowser() && window.localStorage.setItem(EMAIL_FOR_SIGN_IN_KEY, email);
export const clearEnteredEmail = () => isBrowser() && window.localStorage.removeItem(EMAIL_FOR_SIGN_IN_KEY);

export const isLoggedIn = () => isBrowser() && window.localStorage.getItem(LOGGED_IN_KEY) === LOGGED_IN_VALUE;

export const setLoggedIn = () => isBrowser()
  && window.localStorage.setItem(LOGGED_IN_KEY, LOGGED_IN_VALUE)
  && setBearer();

export const clearLoggedIn = () => isBrowser()
  && window.localStorage.removeItem(LOGGED_IN_KEY)
  && setBearer();

let fb: firebase.app.App;
export const getFirebase: (firebase: any) => firebase.app.App = (firebase: any) => {
  if (fb) {
    return fb;
  }
  firebase.initializeApp({
    apiKey: process.env.GATSBY_FIREBASE_API_KEY,
    authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
    storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.GATSBY_FIREBASE_APP_ID
  });
  fb = firebase;
  return firebase;
};

const AUTHORIZATION_HEADER = 'Authorization';
const setBearer = () => {
  getFirebase(firebase).auth().onAuthStateChanged(async user => {
    if (user) {
      axios.defaults.headers.common[AUTHORIZATION_HEADER] = `Bearer ${await user.getIdToken()}`;
    } else {
      delete axios.defaults.headers.common[AUTHORIZATION_HEADER];
    }
  });
};

if (isBrowser()) {
  setBearer();
}
