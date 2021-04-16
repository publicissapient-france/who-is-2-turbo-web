import bgButtonSm from '../../images/bg-button-sm.svg';
import React, { FunctionComponent } from 'react';

export const ButtonSm: FunctionComponent = ({ children }) => (
  <button className="w-full font-game text-xs max-w-xs relative py-2">
    <img src={bgButtonSm} alt="button background" className="w-full"/>
    <span className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 mx-auto">{children}</span>
  </button>
);
