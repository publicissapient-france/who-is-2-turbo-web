import React, {FunctionComponent, useEffect, useState} from 'react';
import {Metadata} from '../Metadata/Metadata';
import {GalleryCard} from "./GalleryCard";
import {Toolbar} from "../Toolbar/Toolbar";
import {Loading} from "../Loading/Loading";
import {SearchBar} from "../Input/SearchBar";
import {fetcher} from "../../services/fetch";
import useSWR from "swr";
import {Filter, getFilteredGallery, updateFilters, User} from "../../services/gallery";


export const Gallery: FunctionComponent<{ location: Location }> = ({location}) => {

    const [gallery, setGallery] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredGallery, setFilteredGallery] = useState<User[]>(gallery)
    const [stateFilters, setStateFilters] = useState<Filter[]>([])

    const filterGallery = () => {
      setFilteredGallery(getFilteredGallery(gallery, stateFilters));
    }

    const handleGalleryFiltering = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;
      let updated_filters = updateFilters([...stateFilters], name, value);
      setStateFilters(updated_filters);
    }

    const {data: member} = useSWR(`/members`, fetcher, {
      onSuccess: (data, key, config) => {
        setGallery(data);
        setFilteredGallery(data);
        setIsLoading(!data);
      },
      revalidateOnFocus: false
    });

    useEffect(() => {
      filterGallery();
    }, [stateFilters])

    return (
      <main className="mb-4 lg:mb-12">
        <Metadata/>
        {!isLoading ? <>
          <Toolbar title="Gallery" buttonLabel="Back" link={location.state.from}/>
          <div className="justify-center flex-col">
            <section className="sticky flex-grow top-12 z-10 h-12 bg-blue-2 mx-4 mb-1">
              <div className="flex justify-center items-center mx-4">
                <SearchBar
                  label=""
                  placeholder="Search members"
                  type="text"
                  name="search"
                  wide
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleGalleryFiltering(event)}
                />
              </div>
            </section>
            <section className="mx-8">
              <div className="text-white text-right mx-4">{filteredGallery.length} members</div>
            </section>
            <section className="flex flex-wrap mx-3 my-3 gap-3 md:gap-2 lg:gap-7 justify-center">
              {filteredGallery.map((user: User) => (
                <GalleryCard key={user.picture} {...user}/>
              ))}
            </section>
          </div>
        </> : <Loading/>}
      </main>
    );
  }
;
