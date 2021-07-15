import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import { isBrowser } from './common';

const EMAIL_FOR_SIGN_IN_KEY = 'emailForSignIn';

export const getEnteredEmail = () => isBrowser() && window.localStorage.getItem(EMAIL_FOR_SIGN_IN_KEY);
export const setEnteredEmail = (email: string) => isBrowser() && window.localStorage.setItem(EMAIL_FOR_SIGN_IN_KEY, email);
export const clearEnteredEmail = () => isBrowser() && window.localStorage.removeItem(EMAIL_FOR_SIGN_IN_KEY);

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

export const logout = () => {
  getFirebase(firebase).auth().signOut();
  delete axios.defaults.headers.common[AUTHORIZATION_HEADER];
  localStorage.clear();
};

export const login = async (user: firebase.User) => {
  axios.defaults.headers.common[AUTHORIZATION_HEADER] = `Bearer ${await user.getIdToken()}`;
};

const interceptUnauthorized = () => {
  axios.interceptors.response.use(response => response, error => {
    if (error && error.response && error.response.status === 401) {
      logout();
    }
    throw error;
  })
};

if (isBrowser()) {
  interceptUnauthorized();
}
