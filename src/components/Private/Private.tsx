import React, { Component, FunctionComponent, useEffect } from 'react';
import { navigate } from 'gatsby';
import firebase from 'firebase/app';
import { clearLoggedIn, getFirebase, isLoggedIn } from '../../services/firebase';

interface PrivateRoutePropTypes {
  component: FunctionComponent<any>
}

export const PrivateRoute: FunctionComponent<PrivateRoutePropTypes> = ({ component: Component, ...rest }) => {
  useEffect(() => {
    getFirebase(firebase).auth().onAuthStateChanged(user => {
      if (!user) {
        clearLoggedIn();
        navigate('/unauthorized');
        return null;
      }
    });
  }, []);

  if (isLoggedIn()) {
    return <Component {...rest} />;
  }

  navigate('/unauthorized');
  return null;
};
