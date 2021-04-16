import React, { FunctionComponent } from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import { PrivateRoute } from '../components/Private/Private';
import { Play } from '../components/Play/Play';
import { End } from '../components/End/End';
import { PageProps } from 'gatsby';
import { Gallery } from '../components/Gallery/Gallery';

const PlayPage = (_props: RouteComponentProps) => <PrivateRoute component={Play}/>;
const GalleryPage = (_props: RouteComponentProps) => <PrivateRoute component={Gallery}/>;
const EndPage = (props: RouteComponentProps) => <PrivateRoute component={End} {...props}/>;

const App: FunctionComponent<PageProps> = ({ location }) => (
  <>
    <Router>
      <PlayPage path="/app/play"/>
      <EndPage path="/app/end" location={location}/>
      <GalleryPage path="/app/gallery"/>
    </Router>
  </>
);

export default App;
