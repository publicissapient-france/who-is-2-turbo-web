import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { Button } from '../Button/Button';
import { ButtonSm } from '../Button/ButtonSm';
import BgScore from '../../images/bg-score.png';

interface EndPropTypes {
  location: Location
}

export const End: FunctionComponent<EndPropTypes> = ({ location }) => {
  const query = new URLSearchParams(location.search);
  return (
    <main className="p-4 flex flex-col container mx-auto max-w-screen-sm text-center justify-center">
      <div className="mt-32 mb-8 relative mx-auto">
        <img className="w-full max-w-md" src={BgScore} alt="score's background"/>
        <span className="font-game absolute text-white inset-0 top-[40%] md:text-xl">{query.get('score')}/{query.get('count')}</span>
      </div>
      <Link to="/app/play/">
        <Button>Play again!</Button>
      </Link>
      <div className="flex space-x-2 justify-center">
        <Link to="/">
          <ButtonSm>Home</ButtonSm>
        </Link>
        <Link to="/app/gallery/">
          <ButtonSm>Gallery</ButtonSm>
        </Link>
      </div>
    </main>
  );
};
