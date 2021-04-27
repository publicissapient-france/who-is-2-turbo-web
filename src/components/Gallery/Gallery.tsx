import React, { useState } from 'react';
import { Metadata } from '../Metadata/Metadata';
import { GalleryPage } from './GalleryPage';

export const Gallery = () => {
  const [page, setPage] = useState(1);
  const pages = [];

  const isLast = (i: number, page: any) => {
    return i === page - 1;
  };

  for (let i = 0; i < page; i++) {
    pages.push(
      <GalleryPage
        offset={i}
        key={i}
        last={isLast(i, page)}
        loadMore={() => setPage(page + 1)}
      />
    );
  }
  return (
    <main className="mb-4 lg:mb-12">
      <Metadata/>
      <h1 className="font-game mt-6 text-l text-[#F0AF00] text-shadow ml-4">Gallery</h1>
      {pages}
    </main>
  );
};
