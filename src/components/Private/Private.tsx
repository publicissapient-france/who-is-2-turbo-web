import React, { Component, FunctionComponent } from 'react';
import { navigate } from 'gatsby';
import firebase from 'firebase/app';
import { clearLoggedIn, isLoggedIn, setLoggedIn } from '../../services/firebase';

interface PrivateRoutePropTypes {
  component: FunctionComponent<any>
}

export const PrivateRoute: FunctionComponent<PrivateRoutePropTypes> = ({ component: Component, ...rest }) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setLoggedIn();
    } else {
      clearLoggedIn();
    }
  });
  if (isLoggedIn()) {
    return <Component {...rest} />;
  }
  navigate('/unauthorized');
  return null;
};
