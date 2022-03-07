import React, { FunctionComponent } from 'react';
import bgItemGallery from '../../images/bg-item-gallery.png';
import newComerBadge from '../../images/new-comer-badge.svg';
import { User } from '../../services/gallery';

export const GalleryCard: FunctionComponent<User> = ({ firstName, lastName, picture, capability, arrivalDate }) => {
  const date = arrivalDate && new Date(arrivalDate);
  const month = date && new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  const year = date && date.getFullYear();
  const isNewComer = date && Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24)) < 90;
  return (
    <div className="relative mb-2 w-[328px]">
      <img className="h-[149px] w-[328px]" src={bgItemGallery} alt="user's background" />
      <img className="absolute top-[17px] left-[25px] h-[100px] w-[75px] shadow-inner" src={picture} alt="user's picture" />
      <div className="absolute left-32 top-4">
        <span className="mb-1 block font-game text-xs capitalize">{firstName}</span>
        <span className="mb-2 block font-game text-xs capitalize">{lastName}</span>
        {capability && <span className="mb-2 block text-base text-blue-3">{capability}</span>}
        {date && (
          <span className="text-sm text-grey-2">
            {month} {year} {isNewComer && <img className="-mt-1 inline" src={newComerBadge} />}
          </span>
        )}
      </div>
    </div>
  );
};
