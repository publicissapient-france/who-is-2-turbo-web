import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import IcBack from '../../images/ic-back.svg';

interface ToolbarPropTypes {
  title: string;
  buttonLabel: string;
  link?: string;
  state?: any;
}

export const Toolbar: FunctionComponent<ToolbarPropTypes> = ({ title, buttonLabel, link, state }) => (
  <section className="relative sticky top-0 z-20 flex h-[48px] items-center justify-center bg-[#1F23A0] shadow-lg">
    <Link to={link ? link : '/'} replace state={state}>
      <button className="absolute left-2 top-0 bottom-0 flex items-center font-game text-[8px] text-white">
        <img src={IcBack} height={16} width={16} /> {buttonLabel}
      </button>
    </Link>
    <h1 className="text-shadow font-game text-[#F0AF00]">{title}</h1>
  </section>
);
