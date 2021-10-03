import React, { FunctionComponent } from 'react';
import { Metadata } from '../Metadata/Metadata';
import useSWR from "swr";
import { GalleryCard } from "./GalleryCard";
import { Toolbar } from "../Toolbar/Toolbar";
import { fetcher } from "../../services/fetch";
import { Loading } from "../Loading/Loading";

export interface User {
  firstName: string;
  lastName: string;
  picture: string;
}

const useGallery = () => {
  const { data } = useSWR(`/members`, fetcher, {
    revalidateOnFocus: false
  });
  return {
    gallery: data,
    isLoading: !data
  };
};

export const Gallery: FunctionComponent<{ location: Location }> = ({ location }) => {
  const { gallery, isLoading } = useGallery();
  return (
    <main className="mb-4 lg:mb-12">
      <Metadata/>
      {!isLoading ? <>
        <Toolbar title="Gallery" buttonLabel="Back" link={location.state.from}/>
        <div className="flex flex-wrap items-center mx-3 my-4 gap-3 md:gap-2 lg:gap-7 justify-center">
          {gallery.map((user: User) => (
            <GalleryCard key={user.picture} {...user}/>
          ))}
        </div>
      </> : <Loading/>}
    </main>
  );
};
