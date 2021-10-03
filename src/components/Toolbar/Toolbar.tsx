import { Link } from "gatsby";
import React, { FunctionComponent } from "react";
import IcBack from "../../images/ic-back.svg"

interface ToolbarPropTypes {
  title: string
  buttonLabel: string
  link?: string
}

export const Toolbar: FunctionComponent<ToolbarPropTypes> = ({ title, buttonLabel, link }) => (
  <section className="h-[48px] shadow-lg sticky top-0 z-10 bg-[#1F23A0] flex items-center justify-center relative">
    <Link to={link ? link : '/'} replace>
      <button className="text-[8px] text-white font-game flex items-center absolute left-2 top-0 bottom-0">
        <img src={IcBack} height={16} width={16}/> {buttonLabel}
      </button>
    </Link>
    <h1 className="font-game text-sm text-[#F0AF00] text-shadow">{title}</h1>
  </section>
)
