import React from "react";
import inputBodyBlue3 from "../../images/input-body-blue3.svg";
import inputLeftBlue3 from "../../images/input-left-blue3.svg";
import inputRightBlue3 from "../../images/input-right-blue3.svg";
import searchLens from "../../images/search-lens.svg";

type SearchBarPropTypes = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  wide?: boolean;
  label?: string;
  name?: string;
};

export const SearchBar = ({ onChange, placeholder, type, wide, label, name }: SearchBarPropTypes) =>
  <>
    {label && <label className="text-sm text-white -mb-2">{label}<sup>*</sup></label>}
    <span className={`flex ${wide && 'w-full'}`}>
      <img src={ inputLeftBlue3 }/>
      <img className="align-middle bg-blue-3" src={searchLens}/>
      <input className={`bg-blue-3 text-white p-2 px-30 placeholder-[#C4C4C4] outline-none ${wide && 'flex-grow'}`}
             placeholder={placeholder}
             type={type}
             onChange={onChange}
             name={name}
             style={{ backgroundImage: `url(${inputBodyBlue3})` }}/>
      <img src={inputRightBlue3}/>
    </span>
  </>
