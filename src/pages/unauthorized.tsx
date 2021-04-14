import { Link } from 'gatsby';
import * as React from 'react';
import { Button } from '../components/Button/Button';

const NotFoundPage = () => {
  return (
    <main className="m-4 text-center">
      <title>Unauthorized</title>
      <h1 className="mt-12 mb-14">You should be signed using your <span className="font-mono">{process.env.GATSBY_ALLOWED_DOMAIN}</span> email to access this content.</h1>
      <Link to="/">
        <Button>Sign in</Button>
      </Link>
      <p className="text-sm">💡 You have to open the received link in the same browser you entered your email.</p>
    </main>
  );
};

export default NotFoundPage;
