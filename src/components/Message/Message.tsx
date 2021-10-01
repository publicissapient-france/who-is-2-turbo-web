import BgMessageLeft from "../../images/bg-message-left.svg";
import HintImage from "../../images/hint.svg";
import BgMessageRight from "../../images/bg-message-right.svg";
import React, { FunctionComponent } from "react";
import { Link } from "gatsby";

interface MessageProps {
  actionLabel?: string
  actionLink?: string
}

export const Message: FunctionComponent<MessageProps> = ({ actionLabel, actionLink }) => (
  <span className="flex w-full max-w-screen-sm">
    <img src={BgMessageLeft} className="h-full"/>
    <span className="flex border-t-2 border-b-2 border-blue-3 pt-2 items-center pb-2 flex-grow">
      <img src={HintImage} className="ml-2 mr-3 h-7"/>
      <span className="py-3">
        <span className="leading-5 text-white text-left">Create your profile to appear in the game and in the leaderboard!</span>
        {actionLabel && actionLink && <div className="mt-2 text-right px-3 text-yellow-3"><Link replace to={actionLink}>{actionLabel}</Link></div>}
      </span>
    </span>
    <img src={BgMessageRight} className="h-full"/>
  </span>
);
