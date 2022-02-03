import React, {FunctionComponent} from "react";
import IcCross from "../../images/ic-cross.svg";


interface DrawerPropTypes {
  display: boolean
  title: string
  onCloseClick: () => void
}

export const Drawer: FunctionComponent<DrawerPropTypes> = (props) => {
  return (
    <>
      {
        props.display ?
          <div className="fixed h-screen w-screen z-20">
            <div onClick={ props.onCloseClick } className="absolute h-screen w-screen bg-black opacity-50" />
            <div className="absolute right-0 w-screen md:w-[540px] mt-[48px] md:mt-0 h-screen bg-white rounded-t-md opacity-100">
              <section className="h-[48px] mb-[24px] flex items-center justify-center relative">
                <p className="font-game text-blue-1">{ props.title }</p>
                <button onClick={props.onCloseClick} className="flex items-center absolute right-3 top-0 bottom-0">
                  <img src={IcCross} height={24} width={24} alt="Close"/>
                </button>
              </section>
              <div className="h-screen box-border pb-[120px] md:pb-[72px] overflow-y-auto">
                {props.children}
              </div>
            </div>
          </div>
          : null
      }
    </>
  );
}
