import React from "react";
import inputBody from "../../images/input-body.svg";
import inputLeft from "../../images/input-left.svg";
import inputRight from "../../images/input-right.svg";

type InputPropTypes = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  autoComplete: string;
  autoFocus: boolean;
  wide?: boolean;
  label?: string;
  errorMessage?: string;
  error?: boolean;
};

export const Input = ({ autoComplete, autoFocus, onChange, placeholder, type, value, wide, label, error, errorMessage }: InputPropTypes) =>
  <>
    {label && <label className="text-sm text-white -mb-2">{label}<sup>*</sup></label>}
    <span className={`flex ${wide && 'w-full'}`}>
      <img src={inputLeft}/>
      <input className={`bg-[#1F23A0] p-2 outline-none ${wide && 'flex-grow'}`}
             placeholder={placeholder}
             required
             type={type}
             value={value}
             autoComplete={autoComplete}
             autoFocus={autoFocus}
             onChange={onChange}
             style={{ backgroundImage: `url(${inputBody})` }}/>
      <img src={inputRight}/>
    </span>
    {error && <span className="text-red-4 text-xs -mt-2">{errorMessage}</span>}
  </>
