import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';

export const Metadata: FunctionComponent = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Whois</title>
    <link rel="canonical" href={process.env.GATSBY_SITE_URL} />
  </Helmet>
);
