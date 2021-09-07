import bgButton from '../../images/bg-big-button.svg';
import bgLeftButton from '../../images/bg-big-left-button.svg';
import bgRightButton from '../../images/bg-big-right-button.svg';
import React, { FunctionComponent } from 'react';

type BigButtonPropTypes = {
  series: number
}

export const SeriesButton: FunctionComponent<BigButtonPropTypes> = ({ series }) => (
  <button type="button" className="relative w-full font-game text-[10px] relative max-w-[298px] focus:outline-none flex">
    <div className="flex">
      <img src={bgLeftButton}/>
      <img src={bgButton} alt="button background"/>
      <img src={bgRightButton}/>
    </div>
    <span className="absolute w-full">
      <span className="relative flex justify-between items-center h-[102px] px-4">
        <span className="flex flex-col items-start justify-center">
          <span className="font-game text-base text-[#1F23AD] text-shadow-3">Series {series}</span>
          <span className="text-[#5256E0] font-text text-sm">Match {series} faces to their names</span>
        </span>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0H12V2H14V4H16V6H14V8H12V10H10V8H12V6H0V4H12V2H10V0Z" fill="#5256E0"/>
        </svg>
      </span>
    </span>
  </button>
);
