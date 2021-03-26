import bgButton from '../../images/bg-button.svg';
import React, { FunctionComponent } from 'react';

type ButtonPropTypes = {
  onClick?: () => void
}

export const Button: FunctionComponent<ButtonPropTypes> = ({ onClick, children }) => (
  <button className="w-full font-game text-xs relative max-w-sm py-1" onClick={onClick ? onClick : () => {
  }}>
    <img src={bgButton} alt="button background" className="w-full"/>
    <span className="absolute inset-x-0 top-1/2 transform -translate-y-3/4 mx-auto">{children}</span>
  </button>
);
