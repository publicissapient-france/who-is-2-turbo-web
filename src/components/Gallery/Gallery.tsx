import React, { FunctionComponent, useEffect, useState } from 'react';
import { Metadata } from '../Metadata/Metadata';
import { GalleryCard } from './GalleryCard';
import { Toolbar } from '../Toolbar/Toolbar';
import { Loading } from '../Loading/Loading';
import { Input } from '../Input/Input';
import { fetcher } from '../../services/fetch';
import useSWR from 'swr';
import { Filter, getFilteredGallery, getSearchedValue, updateFilters, User, getCapabilityFiltered } from '../../services/gallery';
import { Capability } from '../../services/profile';
import { Radio } from '../Radio/Radio';

export const Gallery: FunctionComponent = () => {
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

  useSWR(`/members`, fetcher, {
    onSuccess: (data) => {
      const users = data.map((user: User) => ({ ...user, picture: process.env.GATSBY_API_URL + user.picture }));
      setGallery(users);
      setFilteredGallery(users);
      setIsLoading(!users);
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
          <Toolbar title="Gallery" buttonLabel="Back" />
          <section className="mx-4 flex flex-wrap justify-center justify-items-center gap-x-4">
            <div className="fixed z-10 flex w-full justify-center bg-blue-2">
              <div className="mb-4 w-[328px] bg-blue-2 pt-4">
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
              </div>
            </div>
            <div className="flex w-full justify-center bg-blue-2">
              <div className="mt-20 flex gap-x-4 overflow-x-auto text-white lg:gap-x-6" onChange={handleGalleryFiltering}>
                <Radio key="All" checked={getCapabilityFiltered(stateFilters) === 'All'} name="capability" value="All" label="All" capitalize={true} />
                {Object.values(Capability)
                  .filter((value) => typeof value === 'string')
                  .map((value) => value.toString().toLowerCase())
                  .map((value) => (
                    <Radio key={value} checked={getCapabilityFiltered(stateFilters) === value} name="capability" value={value} label={value} capitalize={true} />
                  ))}
              </div>
            </div>
            <div className="flex w-full justify-center bg-blue-2">
              <div className="mt-4 mb-4 w-[328px] text-center text-white lg:mx-10">{filteredGallery.length} members</div>
            </div>
            {filteredGallery.map((user: User) => (
              <GalleryCard key={user.picture} {...user} />
            ))}
          </section>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};
