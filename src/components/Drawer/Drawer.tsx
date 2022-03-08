import React, { FunctionComponent } from 'react';
import IcCross from '../../images/ic-cross.svg';

interface DrawerPropTypes {
  display: boolean;
  title: string;
  onCloseClick: () => void;
}

export const Drawer: FunctionComponent<DrawerPropTypes> = (props) => (
  <>
    {props.display ? (
      <div className="fixed z-20 h-screen w-screen">
        <div onClick={props.onCloseClick} className="absolute h-screen w-screen bg-black opacity-50" />
        <div className="absolute right-0 mt-12 h-screen w-screen rounded-t-md bg-white opacity-100 md:mt-0 md:w-[540px] animate-translate">
          <section className="relative mb-6 flex h-12 items-center justify-center">
            <p className="font-game text-blue-1">{props.title}</p>
            <button onClick={props.onCloseClick} className="absolute right-3 top-0 bottom-0 flex items-center">
              <img src={IcCross} height={24} width={24} alt="Close" />
            </button>
          </section>
          <div className="box-border h-screen overflow-y-auto pb-32 md:pb-20">{props.children}</div>
        </div>
      </div>
    ) : null}
  </>
);
