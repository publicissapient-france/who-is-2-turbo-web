import firebase from 'firebase/app';
import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import { clearEnteredEmail, getEnteredEmail, getFirebase } from '../services/firebase';

const CallbackPage = () => {
  const finishAuthentication = async () => {
    if (getFirebase(firebase).auth().isSignInWithEmailLink(window.location.href)) {
      const email = getEnteredEmail();
      if (!email) {
        return navigate('/unauthorized/');
      }
      try {
        await getFirebase(firebase)
          .auth()
          .signInWithEmailLink(email || '', window.location.href);
        clearEnteredEmail();
        return navigate('/');
      } catch (e) {
        return navigate('/unauthorized/');
      }
    }
  };

  useEffect(() => {
    finishAuthentication();
  }, [finishAuthentication]);

  return <main />;
};

export default CallbackPage;
