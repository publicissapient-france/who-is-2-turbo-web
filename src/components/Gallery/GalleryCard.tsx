import React, {FunctionComponent} from 'react';
import bgItemGallery from '../../images/bg-item-gallery.png';
import {User} from './Gallery';

export const GalleryCard: FunctionComponent<User> = ({ firstName, lastName, picture }) => (
  <div className="relative text-center">
    <img className="invisible w-full"
         src={bgItemGallery}
         alt="user's background"/>
    <img className="absolute inset-0 w-[86%] mx-auto mt-[11%]"
         src={picture}
         alt="user's picture"/>
    <img className="absolute inset-0 w-full"
         src={bgItemGallery}
         alt="user's background"/>
    <div className="absolute bottom-[7%] lg:bottom-[8%] inset-x-0 leading-tight">
      <div className="font-game text-white mt-1 text-xs lg:text-sm">{firstName}</div>
      <div className="font-game text-white text-xs lg:text-sm">{lastName}</div>
    </div>
  </div>
);
