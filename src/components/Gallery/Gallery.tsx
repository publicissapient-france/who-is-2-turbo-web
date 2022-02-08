import React, { FunctionComponent, useEffect, useState } from 'react';
import { Metadata } from '../Metadata/Metadata';
import { GalleryCard } from './GalleryCard';
import { Toolbar } from '../Toolbar/Toolbar';
import { Loading } from '../Loading/Loading';
import { Input } from '../Input/Input';
import { fetcher } from '../../services/fetch';
import useSWR from 'swr';
import { Filter, getFilteredGallery, getSearchedValue, updateFilters, User } from '../../services/gallery';

export const Gallery: FunctionComponent<{ location: Location }> = ({ location }) => {
  const [gallery, setGallery] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredGallery, setFilteredGallery] = useState<User[]>(gallery);
  const [stateFilters, setStateFilters] = useState<Filter[]>([]);

  const filterGallery = () => {
    setFilteredGallery(getFilteredGallery(gallery, stateFilters));
  };

  const handleGalleryFiltering = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    let updated_filters = updateFilters([...stateFilters], name, value);
    setStateFilters(updated_filters);
  };

  const { data: member } = useSWR(`/members`, fetcher, {
    onSuccess: (data, key, config) => {
      setGallery(data);
      setFilteredGallery(data);
      setIsLoading(!data);
    },
    revalidateOnFocus: false,
  });

  useEffect(() => {
    filterGallery();
  }, [stateFilters]);

  return (
    <main className="mb-4 lg:mb-12">
      <Metadata />
      {!isLoading ? (
        <>
          <Toolbar title="Gallery" buttonLabel="Back" link={location.state.from} />
          <div className="border-t-2 border-blue-1">
            <section className="sticky top-12 z-10 bg-blue-2 p-4 md:max-w-screen-sm">
              <Input
                placeholder="Search members"
                type="text"
                name="search"
                icon="lens"
                value={getSearchedValue(stateFilters)}
                wide
                autoFocus={false}
                autoComplete="firstName or lastName"
                onChange={handleGalleryFiltering}
              />
            </section>
            <section className="mx-8">
              <div className="text-right text-white lg:mx-10">{filteredGallery.length} members</div>
            </section>
            <section className="mx-3 my-3 flex flex-wrap justify-center gap-3 md:gap-2 lg:gap-7">
              {filteredGallery.map((user: User) => (
                <GalleryCard key={user.picture} {...user} />
              ))}
            </section>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};
