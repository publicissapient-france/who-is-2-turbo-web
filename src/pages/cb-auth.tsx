import firebase from 'firebase/app';
import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import { clearEnteredEmail, getEnteredEmail, getFirebase, setLoggedIn } from '../services/firebase';

const CallbackPage = () => {

  const finishAuthentication = async () => {
    if (getFirebase(firebase).auth().isSignInWithEmailLink(window.location.href)) {
      const email = getEnteredEmail();
      if (!email) {
        navigate('/unauthorized/');
      }
      try {
        await getFirebase(firebase).auth().signInWithEmailLink(email || '', window.location.href);
        clearEnteredEmail();
        setLoggedIn();
        navigate('/');
        return null;
      } catch (e) {
        navigate('/unauthorized/');
        return null;
      }
    }
  };

  useEffect(() => {
    finishAuthentication();
  }, [finishAuthentication]);

  return (
    <main/>
  );
};

export default CallbackPage;
