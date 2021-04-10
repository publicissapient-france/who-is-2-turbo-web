import firebase from 'firebase/app';
import { Link, navigate } from 'gatsby';
import React, { ChangeEvent, useState } from 'react';
import { Button } from '../components/Button/Button';
import { isLoggedIn, setEnteredEmail } from '../services/firebase';

const IndexPage = () => {
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(true);
  const [logged, setLogged] = useState(isLoggedIn());

  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      setLogged(false);
    }
  });

  const actionCodeSettings = {
    url: process.env.GATSBY_SITE_URL + 'cb-auth',
    handleCodeInApp: true
  };

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValid(true);
    setEmail(event.target.value);
  };

  const isEmailValid = () => {
    if (email.endsWith(process.env.GATSBY_ALLOWED_DOMAIN!!)) {
      setValid(true);
      return true;
    }
    setValid(false);
    return false;
  };

  const signIn = async (event: Event) => {
    event.preventDefault();
    if (isEmailValid()) {
      try {
        await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
        setEnteredEmail(email);
        navigate('/wait-auth/');
        return null;
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <main className="text-center flex flex-col h-screen container items-center">
      <h1 className="font-game mt-12 text-2xl">Welcome</h1>
      <img className="my-8 px-4" src="https://dummyimage.com/600x300/9e189e/fff.jpg&text=LOGO" alt="app's logo"/>
      {!logged && <form className="w-full px-4">
        <div className="my-6">
          <input className="w-full p-2 rounded outline-none" placeholder="john.doe@publicissapient.com" required type="email" value={email} onChange={onEmailChange}/>
          {!valid && <p className="text-red-400 text-sm leading-tight mt-2">Only {process.env.GATSBY_ALLOWED_DOMAIN} users are allowed to sign-in.</p>}
        </div>
        <Button submit onClick={signIn}>Sign in</Button>
      </form>}
      {logged && <div className="w-full px-4">
        <Link to="/app/play" className="mt-16">
          <Button>Play</Button>
        </Link>
        <Link to="/app/gallery" className="mt-2">
          <Button>Gallery</Button>
        </Link>
      </div>}
    </main>
  );
};

export default IndexPage;
