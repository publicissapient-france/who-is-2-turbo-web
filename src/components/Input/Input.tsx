import React from "react";
import BgInput from "../../images/bg-input.svg";

type InputPropTypes = {
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder: string,
  type: string,
  autoComplete: string,
  autoFocus: boolean
};

export const Input = ({ autoComplete, autoFocus, onChange, placeholder, type, value }: InputPropTypes) =>
  <div className="relative">
    <input className="mx-auto max-w-[288px] w-full bg-[#1F23A0] inset-0 p-2 absolute bg-transparent outline-none"
           placeholder={placeholder}
           required
           type={type}
           value={value}
           autoComplete={autoComplete}
           autoFocus={autoFocus}
           onChange={onChange}/>
    <img src={BgInput} alt="button background" className="mx-auto w-full max-w-[288px]"/>
  </div>;
