import firebase from 'firebase/app';
import { Link, navigate } from 'gatsby';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '../components/Button/Button';
import { getFirebase, setEnteredEmail } from '../services/firebase';
import Logo from '../images/logo.png';
import BgInput from '../images/bg-input.svg';

const IndexPage = () => {
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(true);
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    getFirebase(firebase).auth().onAuthStateChanged(user => {
      if (!user) {
        setLogged(false);
      }
    });
  }, []);

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
        await getFirebase(firebase).auth().sendSignInLinkToEmail(email, actionCodeSettings);
        setEnteredEmail(email);
        navigate('/wait-auth/');
        return null;
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <main className="flex flex-col container mx-auto max-w-screen-sm text-center justify-center items-center">
      <h1 className="font-game mt-12 text-l text-[#F0AF00] text-shadow">Welcome to</h1>
      <img className="w-full my-8 px-4 max-w-md" src={Logo} alt="whois's logo"/>
      {!logged && <form className="w-full px-4">
        <div className="my-6">
          <input style={{ backgroundImage: `url(${BgInput})` }} className="bg-[#1F23A0] w-full bg-cover p-2 outline-none" placeholder="jd@mail.com" required type="email"
                 value={email}
                 onChange={onEmailChange}/>
          {!valid && <p className="text-red-500 text-xs leading-tight mt-2">Only {process.env.GATSBY_ALLOWED_DOMAIN} users are allowed to sign-in.</p>}
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
