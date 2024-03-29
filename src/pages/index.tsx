import firebase from 'firebase/app';
import { Link, navigate } from 'gatsby';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '../components/Button/Button';
import { getFirebase, setEnteredEmail } from '../services/firebase';
import Logo from '../images/logo.svg';
import { Metadata } from '../components/Metadata/Metadata';
import { Input } from '../components/Input/Input';

const IndexPage = () => {
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(true);
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    getFirebase(firebase)
      .auth()
      .onAuthStateChanged((user) => {
        if (!user) {
          setLogged(false);
        }
      });
  }, []);

  const actionCodeSettings = {
    url: process.env.GATSBY_SITE_URL + 'cb-auth',
    handleCodeInApp: true,
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

  const isGauth = process.env.GATSBY_GAUTH === 'true';

  const signIn = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (isGauth) {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        'login_hint': `*${process.env.GATSBY_ALLOWED_DOMAIN}`,
      });
      await getFirebase(firebase).auth().signInWithRedirect(provider);
    } else {
      if (isEmailValid()) {
        try {
          await getFirebase(firebase).auth().sendSignInLinkToEmail(email, actionCodeSettings);
          setEnteredEmail(email);
          navigate('/wait-auth/');
          return null;
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  return (
    <main className="container mx-auto mt-20 flex max-w-screen-sm flex-col items-center justify-center px-6 md:-mt-20 md:h-screen">
      <Metadata />
      {!logged && <h2 className="text-shadow font-game text-tlg text-yellow-3">Welcome to</h2>}
      <img className="mb-8" src={Logo} alt="whois's logo" />
      {!logged && (
        <form className="mt-6 w-full">
          {!isGauth && <Input
            label="Email"
            wide
            value={email}
            onChange={onEmailChange}
            placeholder={`bob${process.env.GATSBY_ALLOWED_DOMAIN}`}
            type="email"
            autoComplete="email"
            autoFocus={true}
            error={!valid}
            errorMessage={`Only ${process.env.GATSBY_ALLOWED_DOMAIN} users are allowed to sign-in.`}
          />}
          <div className="mt-4">
            <Button submit onClick={signIn} wide primary>
              Sign in
            </Button>
          </div>
        </form>
      )}
      {logged && (
        <div className="mt-6 flex w-full flex-col gap-y-2">
          <Link to="/app/play-choice">
            <Button wide primary>
              Start
            </Button>
          </Link>
          <Link to="/app/profile">
            <Button wide>Edit profile</Button>
          </Link>
          <Link to="/app/gallery">
            <Button wide>Gallery</Button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default IndexPage;
