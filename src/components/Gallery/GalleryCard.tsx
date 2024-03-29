import React, { FunctionComponent } from 'react';
import bgItemGallery from '../../images/bg-item-gallery.png';
import bgItemGalleryDesktop from '../../images/bg-item-gallery-desktop.png';
import newComerBadge from '../../images/new-comer-badge.svg';
import { User, isNewComer } from '../../services/gallery';

export const GalleryCard: FunctionComponent<User> = ({ firstName, lastName, picture, capability, arrivalDate }) => {
  const date = arrivalDate && new Date(arrivalDate);
  const month = date && new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  const year = date && date.getFullYear();
  return (
    <>
      <div className="relative mb-2 w-[328px] md:hidden">
        <img className="h-[149px] w-[328px]" src={bgItemGallery} alt="user's background" />
        <img className="absolute top-[17px] left-[25px] h-[100px] w-[75px]" src={picture} alt="user's picture" />
        <div className="absolute top-[17px] left-[25px] h-[100px] w-[75px] border-2 opacity-30" />
        <div className="absolute left-32 top-4">
          <span className="mb-1 block font-game text-xs capitalize">{firstName}</span>
          <span className="mb-2 block font-game text-xs capitalize">{lastName}</span>
          {capability && <span className="mb-2 block text-base text-blue-3">{capability}</span>}
          {date && (
            <span className="text-sm text-grey-2">
              {month} {year} {isNewComer(date) && <img className="-mt-1 inline" src={newComerBadge} />}
            </span>
          )}
        </div>
      </div>
      <div className="relative mb-2 hidden w-[231px] md:block">
        <img className="h-[392px] w-[231px]" src={bgItemGalleryDesktop} alt="user's background" />
        <img className="absolute top-[25px] left-[33px] h-[221px] w-[166px]" src={picture} alt="user's picture" />
        <div className="absolute top-[25px] left-[33px] h-[221px] w-[166px] border-2 opacity-30" />
        <div className="absolute left-4 top-[270px]">
          <span className="mb-1 block font-game text-xs capitalize">{firstName}</span>
          <span className="mb-2 block font-game text-xs capitalize">{lastName}</span>
          {capability && <span className="mb-2 block text-base text-blue-3">{capability}</span>}
          {date && (
            <span className="text-sm text-grey-2">
              {month} {year} {isNewComer(date) && <img className="-mt-1 inline" src={newComerBadge} />}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
