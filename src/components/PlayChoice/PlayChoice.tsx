import React from "react";
import { Metadata } from "../Metadata/Metadata";
import { SeriesButton } from "../Button/SeriesButton";
import { Toolbar } from "../Toolbar/Toolbar";

export const PlayChoice = () => (
  <main className="h-screen">
    <Metadata/>
    <Toolbar title="Categories" buttonLabel="Back"/>
    <section className="px-6 mt-4 flex flex-col gap-y-8 py-4 md:h-4/5 md:justify-center mx-auto max-w-screen-sm">
      <SeriesButton series={5}/>
      <SeriesButton series={20}/>
    </section>
  </main>
)
