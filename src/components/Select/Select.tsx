import React, { ChangeEvent, FunctionComponent } from "react";
import Left from "../../images/bg-select-left.svg"
import Right from "../../images/bg-select-right.svg"
import Arrow from "../../images/bg-select-arrow.svg";

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
  <span className="flex flex-grow relative">
    <img src={Left}/>
    <select onChange={onChange} name={name} defaultValue={value} className="pl-2 capitalize cursor-pointer bg-white border-t-2 border-b-2 border-blue-1">
      {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
    <img className="absolute right-4 inset-y-0 m-auto" src={Arrow}/>
    <img src={Right}/>
  </span>
);
