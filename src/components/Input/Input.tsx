import React from "react";
import inputBodyBlue3 from "../../images/input-body-blue3.svg";
import inputLeftBlue3 from "../../images/input-left-blue3.svg";
import inputRightBlue3 from "../../images/input-right-blue3.svg";
import iconLens from "../../images/search-lens.svg";

const icons = [
  { name: 'lens', icon: iconLens}
]

type InputPropTypes = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  autoComplete: string;
  autoFocus: boolean;
  name: string;
  icon?: string;
  wide?: boolean;
  label?: string;
  errorMessage?: string;
  error?: boolean;
};

const getIcon = (iconName: string) => Object.values(icons).filter(i => i.name === iconName).map(i => i.icon).toString();

export const Input = ({ autoComplete, autoFocus, onChange, placeholder, type, value, name, icon, wide, label, error, errorMessage }: InputPropTypes) =>
  <>
    {label && <label className="text-sm text-white -mb-2">{label}<sup>*</sup></label>}
    <span className={`flex ${wide && 'w-full'}`}>
      <img src={inputLeftBlue3}/>
      { icon &&  <img className="align-middle bg-blue-3" src={getIcon(icon)}/> }
      <input className={`bg-blue-3 text-white p-2 placeholder-[#C4C4C4] outline-none ${wide && 'flex-grow'}`}
             placeholder={placeholder}
             required
             type={type}
             name={name}
             value={value}
             autoComplete={autoComplete}
             autoFocus={autoFocus}
             onChange={onChange}
             style={{ backgroundImage: `url(${inputBodyBlue3})` }}/>
      <img src={inputRightBlue3}/>
    </span>
    {error && <span className="text-red-4 text-xs -mt-2">{errorMessage}</span>}
  </>
