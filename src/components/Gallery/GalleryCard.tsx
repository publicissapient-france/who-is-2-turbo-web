import React, {FunctionComponent} from 'react';
import bgItemGallery from '../../images/bg-item-gallery.png';
import {User} from './Gallery';

export const GalleryCard: FunctionComponent<User> = ({ firstName, lastName, picture }) => (
  <div className="relative text-center w-[142px]">
    <img className="invisible w-full"
         src={bgItemGallery}
         alt="user's background"/>
    <img className="absolute inset-0 w-full mt-3"
         src={picture}
         alt="user's picture"/>
    <img className="absolute inset-0 w-full"
         src={bgItemGallery}
         alt="user's background"/>
    <div className="absolute bottom-[23px] inset-x-0 leading-tight">
      <div className="font-game mt-1 text-[8px]">{firstName}</div>
      <div className="font-game text-[8px]">{lastName}</div>
    </div>
  </div>
);
