import React, { FunctionComponent } from 'react';
import bgItemGallery from '../../images/bg-item-gallery.png';
import { User } from './Gallery';

export const GalleryCard: FunctionComponent<User> = ({ firstName, lastName, picture }) => (
  <div className="relative w-[142px] text-center">
    <img className="invisible w-full" src={bgItemGallery} alt="user's background" />
    <img className="absolute inset-0 mt-[2px] w-full p-[10px]" src={picture} alt="user's picture" />
    <img className="absolute inset-0 w-full" src={bgItemGallery} alt="user's background" />
    <div className="absolute inset-x-0 bottom-[23px] leading-tight">
      <div className="mt-1 font-game text-[8px]">{firstName}</div>
      <div className="font-game text-[8px]">{lastName}</div>
    </div>
  </div>
);
