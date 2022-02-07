import React, { Component, FunctionComponent, useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import firebase from 'firebase/app';
import { getFirebase, login, logout } from '../../services/firebase';
import { Loading } from '../Loading/Loading';

interface PrivateRoutePropTypes {
  component: FunctionComponent<any>;
}

export const PrivateRoute: FunctionComponent<PrivateRoutePropTypes> = ({ component: Component, ...rest }) => {
  const [component, setComponent] = useState(<Loading />);
  useEffect(() => {
    getFirebase(firebase)
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          logout();
          return navigate('/unauthorized');
        } else {
          await login(user);
          setComponent(<Component {...rest} />);
        }
      });
  }, []);

  return component;
};
