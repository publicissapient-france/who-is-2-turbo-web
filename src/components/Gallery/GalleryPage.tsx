import axios from 'axios';
import React, { FunctionComponent } from 'react';
import useSWR from 'swr';
import { GalleryCard } from './GalleryCard';
import { clearGalleryPage, getGalleryPage, saveGalleryPage } from '../../services/gallery';
import { Button } from '../Button/Button';

interface GalleryPagePropTypes {
  offset: number
  last: boolean
  loadMore: () => void
}

export interface User {
  firstName: string;
  lastName: string;
  picture: string;
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const GALLERY_MAX_USERS_PER_REQUEST = 12;

export const GalleryPage: FunctionComponent<GalleryPagePropTypes> = ({ offset, last, loadMore }) => {
  const { data } = useSWR(`/members?offset=${offset * GALLERY_MAX_USERS_PER_REQUEST}&limit=${GALLERY_MAX_USERS_PER_REQUEST}`, fetcher, {
    initialData: getGalleryPage(offset * GALLERY_MAX_USERS_PER_REQUEST, GALLERY_MAX_USERS_PER_REQUEST),
    revalidateOnMount: true,
    revalidateOnFocus: false,
    onError: () => clearGalleryPage(offset, GALLERY_MAX_USERS_PER_REQUEST),
    onSuccess: (data) => {
      saveGalleryPage(offset, GALLERY_MAX_USERS_PER_REQUEST, data);
      return { data };
    }
  });
  return <>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mx-4 mt-6">
      {data.map((user: User) => (
        <GalleryCard key={user.picture} {...user}/>
      ))}
    </div>
    {last && data.length === GALLERY_MAX_USERS_PER_REQUEST && <div className="p-4">
      <Button onClick={loadMore}>Load more</Button>
    </div>}
  </>;
};
