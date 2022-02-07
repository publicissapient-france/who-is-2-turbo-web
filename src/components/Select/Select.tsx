import React, { ChangeEvent, FunctionComponent } from 'react';
import Left from '../../images/bg-select-left.svg';
import Right from '../../images/bg-select-right.svg';
import Arrow from '../../images/bg-select-arrow.svg';

interface Option {
  value: number;
  label: string;
}

interface SelectProps {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

export const Select: FunctionComponent<SelectProps> = ({ options, name, onChange, value }) => (
  <span className="relative flex flex-grow">
    <img src={Left} />
    <select onChange={onChange} name={name} defaultValue={value} className="cursor-pointer border-t-2 border-b-2 border-blue-1 bg-white pl-2 capitalize">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <img className="absolute inset-y-0 right-4 m-auto" src={Arrow} />
    <img src={Right} />
  </span>
);
