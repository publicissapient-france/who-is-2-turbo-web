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
  <span className="flex w-72">
    <img src={BgMessageLeft} className="h-full"/>
      <span className="flex flex-col border-t-2 border-b-2 border-[#5256E0] pt-2">
        <span className="flex items-center">
          <img src={HintImage} className="ml-2 mr-3"/>
          <span className="leading-5 text-white text-left">Create your profile to appear in the game and in the leaderboard!</span>
        </span>
        {actionLabel && actionLink && <Link replace to={actionLink} className="text-right p-3 text-[#F0AF00]">{actionLabel}</Link>}
      </span>
    <img src={BgMessageRight} className="h-full"/>
  </span>
);
