import bgButton from '../../images/bg-button.svg';
import React, { FunctionComponent, MouseEventHandler } from 'react';

type ButtonPropTypes = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  submit?: boolean
}

export const Button: FunctionComponent<ButtonPropTypes> = ({ onClick, submit, children }) => (
  <button type={submit ? 'submit' : 'button'} className="w-full font-game text-[10px] relative max-w-[288px] focus:outline-none" onClick={onClick}>
    <img src={bgButton} alt="button background" className="w-full"/>
    <span className="absolute inset-x-0 top-1/2 transform -translate-y-3/4 mx-auto">{children}</span>
  </button>
);
