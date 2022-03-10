import React, { FunctionComponent } from 'react';
import Left from '../../images/radio-left.svg';
import Right from '../../images/radio-right.svg';
import Circle from '../../images/radio-circle.svg';
import LeftCheck from '../../images/radio-left-select.svg';
import RightCheck from '../../images/radio-right-select.svg';

interface RadioProps {
  name: string;
  value: string;
  checked: boolean;
  label: string;
}

export const Radio: FunctionComponent<RadioProps> = ({ name, label, value, checked }) => (
  <span>
    <input id={value} className="hidden" type="radio" name={name} value={value} defaultChecked={checked} />
    <label htmlFor={value} className="flex cursor-pointer">
      <img src={checked ? LeftCheck : Left} />
      <span className={`flex flex-grow border-t-2 border-b-2 ${checked ? 'border-yellow-3' : 'border-blue-3'} items-center justify-center`}>
        {label}
      </span>
      <img src={checked ? RightCheck : Right} />
    </label>
  </span>
);
