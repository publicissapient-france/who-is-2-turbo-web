import React from 'react';
import { Metadata } from '../Metadata/Metadata';
import useSWR from "swr";
import { clearGalleryPage, getGalleryPage, saveGalleryPage } from "../../services/gallery";
import { GalleryCard } from "./GalleryCard";
import axios from "axios";
import { Toolbar } from "../Toolbar/Toolbar";

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
      <Toolbar title="Gallery" buttonLabel="Back"/>
      <div className="flex flex-wrap items-center mx-3 my-4 gap-3 md:gap-2 lg:gap-7">
        {data.map((user: User) => (
          <GalleryCard key={user.picture} {...user}/>
        ))}
      </div>
    </main>
  );
};
