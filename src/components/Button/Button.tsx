import secondaryButtonLeft from '../../images/secondary-button-left.svg';
import secondaryButtonLeftHover from '../../images/secondary-button-left-hover.svg';
import secondaryButtonLeftActive from '../../images/secondary-button-left-active.svg';
import secondaryButtonRight from '../../images/secondary-button-right.svg';
import secondaryButtonRightHover from '../../images/secondary-button-right-hover.svg';
import secondaryButtonRightActive from '../../images/secondary-button-right-active.svg';
import secondaryButtonBody from '../../images/secondary-button-body.svg';
import secondaryButtonBodyHover from '../../images/secondary-button-body-hover.svg';
import secondaryButtonBodyActive from '../../images/secondary-button-body-active.svg';
import primaryButtonLeft from '../../images/primary-button-left.svg';
import primaryButtonLeftHover from '../../images/primary-button-left-hover.svg';
import primaryButtonLeftActive from '../../images/primary-button-left-active.svg';
import primaryButtonRight from '../../images/primary-button-right.svg';
import primaryButtonRightHover from '../../images/primary-button-right-hover.svg';
import primaryButtonRightActive from '../../images/primary-button-right-active.svg';
import primaryButtonBody from '../../images/primary-button-body.svg';
import primaryButtonBodyHover from '../../images/primary-button-body-hover.svg';
import primaryButtonBodyActive from '../../images/primary-button-body-active.svg';
import React, { FunctionComponent, MouseEventHandler } from 'react';

type ButtonPropTypes = {
  onClick?: MouseEventHandler;
  submit?: boolean;
  primary?: boolean;
  icon?: string;
  wide?: boolean;
  capitalize?: boolean;
}

export const Button: FunctionComponent<ButtonPropTypes> = ({ capitalize, wide, onClick, submit, primary, icon, children }) => (
  <button type={submit ? 'submit' : 'button'} className={`group flex focus:outline-none ${wide ? 'w-full' : ''}`} onClick={onClick}>
    <span className="h-12 w-2 block group-hover:hidden group-active:hidden" style={{ background: `url(${primary ? primaryButtonLeft : secondaryButtonLeft})` }}/>
    <span className="h-12 w-2 hidden group-hover:block group-active:hidden" style={{ background: `url(${primary ? primaryButtonLeftHover : secondaryButtonLeftHover})` }}/>
    <span className="h-12 w-2 hidden group-active:block" style={{ background: `url(${primary ? primaryButtonLeftActive : secondaryButtonLeftActive})` }}/>
    <span className={`group-hover:hidden group-active:hidden px-2 h-12 text-txs text-blue-2 font-game flex items-center ${wide ? 'flex-grow justify-center' : ''}`}
          style={{ background: `url(${primary ? primaryButtonBody : secondaryButtonBody})` }}>
      {icon && <img src={icon} className="-mt-2"/>}
      {children && <span className={`ml-2 -mt-1 ${capitalize ? 'capitalize' : 'uppercase'}`}>{children}</span>}
    </span>
    <span className={`hidden group-hover:flex group-active:hidden px-2 h-12 text-txs text-blue-2 font-game flex items-center ${wide ? 'flex-grow justify-center' : ''}`}
          style={{ background: `url(${primary ? primaryButtonBodyHover : secondaryButtonBodyHover})` }}>
      {icon && <img src={icon} className="-mt-1"/>}
      {children && <span className={`ml-2 ${capitalize ? 'capitalize' : 'uppercase'}`}>{children}</span>}
    </span>
    <span className={`hidden group-active:flex px-2 h-12 text-txs text-blue-2 font-game flex items-center ${wide ? 'flex-grow justify-center' : ''}`}
          style={{ background: `url(${primary ? primaryButtonBodyActive : secondaryButtonBodyActive})` }}>
      {icon && <img src={icon}/>}
      {children && <span className={`ml-2 mt-1 ${capitalize ? 'capitalize' : 'uppercase'}`}>{children}</span>}
    </span>
    <span className="h-12 w-2 block group-hover:hidden group-active:hidden" style={{ background: `url(${primary ? primaryButtonRight : secondaryButtonRight})` }}/>
    <span className="h-12 w-2 hidden group-hover:block group-active:hidden" style={{ background: `url(${primary ? primaryButtonRightHover : secondaryButtonRightHover})` }}/>
    <span className="h-12 w-2 hidden group-active:block" style={{ background: `url(${primary ? primaryButtonRightActive : secondaryButtonRightActive})` }}/>
  </button>
);
