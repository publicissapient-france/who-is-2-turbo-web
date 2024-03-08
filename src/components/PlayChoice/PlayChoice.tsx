import React from 'react';
import { Metadata } from '../Metadata/Metadata';
import { SeriesButton } from '../Button/SeriesButton';
import { Toolbar } from '../Toolbar/Toolbar';

export const PlayChoice = () => (
  <main className="h-screen">
    <Metadata />
    <Toolbar title="Categories" buttonLabel="Back" />
    <div className="mx-auto mt-4  max-w-screen-xl flex flex-col gap-y-8 px-6 py-4 md:h-4/5 md:justify-center">
      <section className="flex flex-row flex-wrap gap-x-8 gap-y-4 md:justify-center">
        <SeriesButton series={'ALL'} />
      </section>
      <section className="flex flex-row gap-x-8 md:justify-center">
        <SeriesButton series={'SERIES_5'} />
        <SeriesButton series={'SERIES_20'} />
      </section>
      <section className="flex flex-row max-w-screen-xl flex-wrap gap-x-8 gap-y-4 md:justify-center">
        <SeriesButton series={'PRODUCT'} />
        <SeriesButton series={'ENGINEERING'} />
      </section>
      <section className="flex flex-row max-w-screen-xl flex-wrap gap-x-8 gap-y-4 md:justify-center">
        <SeriesButton series={'EXPERIENCE'} />
        <SeriesButton series={'DATA'} />
      </section>
    </div>
  </main>
);
