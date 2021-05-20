import firebase from 'firebase/app';
import {Link, navigate} from 'gatsby';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button} from '../components/Button/Button';
import {getFirebase, setEnteredEmail} from '../services/firebase';
import Logo from '../images/logo.png';
import BgInput from '../images/bg-input.svg';
import {Metadata} from '../components/Metadata/Metadata';

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
    <main className="flex flex-col container mx-auto text-center justify-center items-center md:h-screen mt-12 md:-mt-12">
      <Metadata/>
      <h1 className="font-game mb-2 text-sm md:text-base text-[#F0AF00] text-shadow">Welcome to</h1>
      <img className="mb-8" width={195} height={148} src={Logo} alt="whois's logo"/>
      {!logged && <form className="w-full px-4">
        <div className="relative">
          <input className="mx-auto max-w-[288px] w-full bg-[#1F23A0] inset-0 p-2 absolute bg-transparent outline-none"
                 placeholder="jd@mail.com"
                 required
                 type="email"
                 value={email}
                 autoComplete="email"
                 autoFocus={true}
                 onChange={onEmailChange}/>
          <img src={BgInput} alt="button background" className="mx-auto w-full max-w-[288px]"/>
        </div>
        {!valid && <p className="mx-auto text-left max-w-sm text-red-500 text-xs leading-tight mt-2">Only {process.env.GATSBY_ALLOWED_DOMAIN} users are allowed to sign-in.</p>}
        <div className="mt-4">
          <Button submit onClick={signIn}>Sign in</Button>
        </div>
      </form>}
      {logged && <div className="px-4 flex flex-col">
        <Link to="/app/play">
          <Button>Play</Button>
        </Link>
        <Link to="/app/gallery">
          <Button>Gallery</Button>
        </Link>
      </div>}
    </main>
  );
};

export default IndexPage;
