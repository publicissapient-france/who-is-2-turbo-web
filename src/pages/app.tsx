import React, { FunctionComponent } from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import { PrivateRoute } from '../components/Private/Private';
import { Play } from '../components/Play/Play';
import { End } from '../components/End/End';
import { PageProps } from 'gatsby';
import { Gallery } from '../components/Gallery/Gallery';
import { Leaderboard } from '../components/Leaderboard/Leaderboard';
import { Profile } from '../components/Profile/Profile';
import { PlayChoice } from '../components/PlayChoice/PlayChoice';

const PlayChoicePage = (_props: RouteComponentProps) => <PrivateRoute component={PlayChoice} />;
const PlayPage = (props: RouteComponentProps) => <PrivateRoute component={Play} {...props} />;
const GalleryPage = (props: RouteComponentProps) => <PrivateRoute component={Gallery} {...props} />;
const LeaderboardPage = (props: RouteComponentProps) => <PrivateRoute component={Leaderboard} {...props} />;
const EndPage = (props: RouteComponentProps) => <PrivateRoute component={End} {...props} />;
const EndWithSummaryPage = (props: RouteComponentProps) => <PrivateRoute component={End} {...props} />;
const ProfilePage = (_props: RouteComponentProps) => <PrivateRoute component={Profile} />;

export const PlayChoicePath = '/app/play-choice';
export const PlayPath = 'app/play';
export const GalleryPath = '/app/gallery';
export const LeaderboardPath = '/app/leaderboard';
export const ProfilePath = '/app/profile';
export const EndPath = '/app/end';
export const EndWithSummaryPath = '/app/end/summary';

const App: FunctionComponent<PageProps> = ({ location }) => (
  <>
    <Router>
      <PlayChoicePage path={PlayChoicePath} />
      <PlayPage path={PlayPath} />
      <GalleryPage path={GalleryPath} />
      <LeaderboardPage path={LeaderboardPath} />
      <ProfilePage path={ProfilePath} />
      <EndPage path={EndPath} location={location} />
      <EndWithSummaryPage path={EndWithSummaryPath} location={location} />
    </Router>
  </>
);

export default App;
