import React from 'react';
import { GalleryCard } from '../GalleryCard/GalleryCard';

export const Gallery = () => {
  return (
    <main className="mb-4 lg:mb-12">
      <h1 className="font-game mt-6 text-l text-[#F0AF00] text-shadow ml-4">Gallery</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mx-4 mt-6">
        <GalleryCard/>
        <GalleryCard/>
        <GalleryCard/>
        <GalleryCard/>
        <GalleryCard/>
        <GalleryCard/>
        <GalleryCard/>
        <GalleryCard/>
      </div>
    </main>
  );
};
