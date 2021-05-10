import React from 'react';
import {Metadata} from '../Metadata/Metadata';
import useSWR from "swr";
import {clearGalleryPage, getGalleryPage, saveGalleryPage} from "../../services/gallery";
import {GalleryCard} from "./GalleryCard";
import axios from "axios";

export interface User {
  firstName: string;
  lastName: string;
  picture: string;
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const Gallery = () => {
  const {data} = useSWR(`/members`, fetcher, {
    initialData: getGalleryPage(),
    revalidateOnMount: true,
    revalidateOnFocus: false,
    onError: () => clearGalleryPage(),
    onSuccess: (users) => {
      saveGalleryPage(users);
      return {data: users};
    }
  });
  return (
    <main className="mb-4 lg:mb-12">
      <Metadata/>
      <h1 className="font-game mt-6 text-l text-[#F0AF00] text-shadow ml-4">Gallery</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mx-4 mt-6">
        {data.map((user: User) => (
          <GalleryCard key={user.picture} {...user}/>
        ))}
      </div>
    </main>
  );
};
