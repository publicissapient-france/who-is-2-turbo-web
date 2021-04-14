import React, { FunctionComponent } from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import { PrivateRoute } from '../components/Private/Private';
import { Play } from '../components/Play/Play';
import { End } from '../components/End/End';
import { PageProps } from 'gatsby';

const PlayPage = (_props: RouteComponentProps) => <PrivateRoute component={Play}/>;
const EndPage = (props: RouteComponentProps) => <PrivateRoute component={End} {...props}/>;

const App: FunctionComponent<PageProps> = ({ location }) => (
  <>
    <Router>
      <PlayPage path="/app/play"/>
      <EndPage path="/app/end" location={location}/>
    </Router>
  </>
);

export default App;
