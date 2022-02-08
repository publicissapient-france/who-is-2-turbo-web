import disabledButtonLeft from '../../images/bg-button-disabled-left.svg';
import disabledButtonRight from '../../images/bg-button-disabled-right.svg';
import disabledButtonBody from '../../images/bg-button-disabled-body.svg';
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
  disabled?: boolean;
};

const DisabledButton: FunctionComponent<ButtonPropTypes> = ({ capitalize, wide, icon, children }) => (
  <button type="button" disabled className={`group flex focus:outline-none ${wide ? 'w-full' : ''}`}>
    <span className="block h-12 w-2" style={{ background: `url(${disabledButtonLeft})` }} />
    <span className={`flex h-12 items-center px-2 font-game text-txs text-grey-3 ${wide ? 'flex-grow justify-center' : ''}`} style={{ background: `url(${disabledButtonBody})` }}>
      {icon && <img src={icon} className="-mt-2" />}
      {children && <span className={`ml-2 -mt-1 ${capitalize ? 'capitalize' : 'uppercase'}`}>{children}</span>}
    </span>
    <span className="h-12 w-2" style={{ background: `url(${disabledButtonRight})` }} />
  </button>
);

export const Button: FunctionComponent<ButtonPropTypes> = ({ disabled, capitalize, wide, onClick, submit, primary, icon, children }) => {
  if (disabled) {
    return (
      <DisabledButton capitalize={capitalize} wide={wide}>
        {children}
      </DisabledButton>
    );
  }

  return (
    <button type={submit ? 'submit' : 'button'} className={`group flex focus:outline-none ${wide ? 'w-full' : ''}`} onClick={onClick}>
      <span className="block h-12 w-2 group-hover:hidden group-active:hidden" style={{ background: `url(${primary ? primaryButtonLeft : secondaryButtonLeft})` }} />
      <span className="hidden h-12 w-2 group-hover:block group-active:hidden" style={{ background: `url(${primary ? primaryButtonLeftHover : secondaryButtonLeftHover})` }} />
      <span className="hidden h-12 w-2 group-active:block" style={{ background: `url(${primary ? primaryButtonLeftActive : secondaryButtonLeftActive})` }} />
      <span
        className={`flex h-12 items-center px-2 font-game text-txs text-blue-2 group-hover:hidden group-active:hidden ${wide ? 'flex-grow justify-center' : ''}`}
        style={{ background: `url(${primary ? primaryButtonBody : secondaryButtonBody})` }}
      >
        {icon && <img src={icon} className="-mt-2" />}
        {children && <span className={`ml-2 -mt-1 ${capitalize ? 'capitalize' : 'uppercase'}`}>{children}</span>}
      </span>
      <span
        className={`flex hidden h-12 items-center px-2 font-game text-txs text-blue-2 group-hover:flex group-active:hidden ${wide ? 'flex-grow justify-center' : ''}`}
        style={{ background: `url(${primary ? primaryButtonBodyHover : secondaryButtonBodyHover})` }}
      >
        {icon && <img src={icon} className="-mt-1" />}
        {children && <span className={`ml-2 ${capitalize ? 'capitalize' : 'uppercase'}`}>{children}</span>}
      </span>
      <span
        className={`flex hidden h-12 items-center px-2 font-game text-txs text-blue-2 group-active:flex ${wide ? 'flex-grow justify-center' : ''}`}
        style={{ background: `url(${primary ? primaryButtonBodyActive : secondaryButtonBodyActive})` }}
      >
        {icon && <img src={icon} />}
        {children && <span className={`ml-2 mt-1 ${capitalize ? 'capitalize' : 'uppercase'}`}>{children}</span>}
      </span>
      <span className="block h-12 w-2 group-hover:hidden group-active:hidden" style={{ background: `url(${primary ? primaryButtonRight : secondaryButtonRight})` }} />
      <span className="hidden h-12 w-2 group-hover:block group-active:hidden" style={{ background: `url(${primary ? primaryButtonRightHover : secondaryButtonRightHover})` }} />
      <span className="hidden h-12 w-2 group-active:block" style={{ background: `url(${primary ? primaryButtonRightActive : secondaryButtonRightActive})` }} />
    </button>
  );
};
