import secondaryButtonLeft from '../../images/secondary-button-left.svg';
import secondaryButtonRight from '../../images/secondary-button-right.svg';
import secondaryButtonBody from '../../images/secondary-button-body.svg';
import primaryButtonLeft from '../../images/primary-button-left.svg';
import primaryButtonRight from '../../images/primary-button-right.svg';
import primaryButtonBody from '../../images/primary-button-body.svg';
import React, { FunctionComponent, MouseEventHandler } from 'react';

type ButtonPropTypes = {
  onClick?: MouseEventHandler;
  submit?: boolean;
  primary?: boolean;
  icon?: string;
  wide?: boolean;
}

export const Button: FunctionComponent<ButtonPropTypes> = ({ wide, onClick, submit, primary, icon, children }) => (
  <button type={submit ? 'submit' : 'button'} className={`flex focus:outline-none ${wide ? 'w-full' : ''}`} onClick={onClick}>
    <span className="h-12 w-2 block" style={{ background: `url(${primary ? primaryButtonLeft : secondaryButtonLeft})` }}/>
    <span className={`px-2 h-12 text-txs text-blue-2 font-game flex items-center ${wide ? 'flex-grow justify-center' : ''}`}
          style={{ background: `url(${primary ? primaryButtonBody : secondaryButtonBody})` }}>
      {icon && <img src={icon} className="-mt-2"/>}
      {children && <span className="ml-2 -mt-1">{children}</span>}
    </span>
    <span className="h-12 w-2 block" style={{ background: `url(${primary ? primaryButtonRight : secondaryButtonRight})` }}/>
  </button>
);
