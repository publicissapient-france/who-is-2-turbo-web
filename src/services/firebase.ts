import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID
});

const EMAIL_FOR_SIGN_IN_KEY = 'emailForSignIn';
const LOGGED_IN_KEY = 'loggedIn';
const LOGGED_IN_VALUE = 'y';

export const getEnteredEmail = () => window.localStorage.getItem(EMAIL_FOR_SIGN_IN_KEY);
export const setEnteredEmail = (email: string) => window.localStorage.setItem(EMAIL_FOR_SIGN_IN_KEY, email);
export const clearEnteredEmail = () => window.localStorage.removeItem(EMAIL_FOR_SIGN_IN_KEY);

export const isLoggedIn = () => window.localStorage.getItem(LOGGED_IN_KEY) === LOGGED_IN_VALUE;
export const setLoggedIn = () => window.localStorage.setItem(LOGGED_IN_KEY, LOGGED_IN_VALUE);
export const clearLoggedIn = () => window.localStorage.removeItem(LOGGED_IN_KEY);
