import React from 'react';
import { Metadata } from '../Metadata/Metadata';
import { SeriesButton } from '../Button/SeriesButton';
import { Toolbar } from '../Toolbar/Toolbar';

export const PlayChoice = () => (
  <main className="h-screen">
    <Metadata />
    <Toolbar title="Categories" buttonLabel="Back" />
    <section className="mx-auto mt-4 flex max-w-screen-sm flex-col gap-y-8 px-6 py-4 md:h-4/5 md:justify-center">
      <SeriesButton series={5} />
      <SeriesButton series={20} />
    </section>
  </main>
);
