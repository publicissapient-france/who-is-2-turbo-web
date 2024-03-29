import BgMessageLeft from '../../images/bg-message-left.svg';
import BgMessageActionLeft from '../../images/bg-message-action-left.svg';
import HintImage from '../../images/hint.svg';
import BgMessageRight from '../../images/bg-message-right.svg';
import BgMessageActionRight from '../../images/bg-message-action-right.svg';
import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';

interface MessageProps {
  actionLabel?: string;
  actionLink?: string;
}

export const Message: FunctionComponent<MessageProps> = ({ actionLabel, actionLink }) => (
  <span className="flex w-full max-w-screen-sm">
    <img src={actionLabel ? BgMessageActionLeft : BgMessageLeft} className="h-full object-cover" />
    <span className="flex h-full flex-grow items-center border-t-2 border-b-2 border-blue-3">
      <img src={HintImage} className="ml-2 mr-3 h-7" />
      <span>
        <span className="text-left leading-5 text-white">Create your profile to appear in the game and in the leaderboard!</span>
        {actionLabel && actionLink && (
          <div className="mt-2 px-3 text-right text-yellow-3">
            <Link replace to={actionLink}>
              {actionLabel}
            </Link>
          </div>
        )}
      </span>
    </span>
    <img src={actionLabel ? BgMessageActionRight : BgMessageRight} className="h-full object-cover" />
  </span>
);
