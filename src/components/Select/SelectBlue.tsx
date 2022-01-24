import React, { ChangeEvent, FunctionComponent } from "react";
import Left from "../../images/bg-select-left.svg"
import Right from "../../images/bg-select-right.svg"
import Arrow from "../../images/bg-select-arrow.svg";
import inputLeftBlue3 from "../../images/input-left-blue3.svg";
import inputRightBlue3 from "../../images/input-right-blue3.svg";

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
    <img src={ inputLeftBlue3 }/>
    {/*# TODO la list déroulante reste blanche*/}
    <select onChange={onChange} name={name} className="pl-2 capitalize cursor-pointer bg-blue-3 border-t-2 border-b-2 border-blue-3 text-[#C4C4C4]">
      <option key="" value="">Capability</option>
      {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
    <img className="absolute right-4 inset-y-0 m-auto bg-blue-3 text-[#C4C4C4]" src={Arrow}/>
    <img src={inputRightBlue3}/>
  </span>
);
