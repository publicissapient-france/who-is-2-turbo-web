import React from 'react';
import bgItemGallery from '../../images/bg-item-gallery.png';

export const GalleryCard = () => (
  <div className="relative text-center">
    <img className="invisible w-full"
         src={bgItemGallery}
         alt="user's background"/>
    <img className="absolute inset-0 w-[86%] mx-auto mt-[11%]"
         src="https://dummyimage.com/600x800/9e189e/fff.jpg&text=3:4"
         alt="user's picture"/>
    <img className="absolute inset-0 w-full"
         src={bgItemGallery}
         alt="user's background"/>
    <div className="absolute bottom-[7%] lg:bottom-[8%] inset-x-0 leading-tight">
      <div className="font-game text-white mt-1 text-xs lg:text-sm">John</div>
      <div className="font-game text-white text-xs lg:text-sm">Doe</div>
    </div>
  </div>
);
