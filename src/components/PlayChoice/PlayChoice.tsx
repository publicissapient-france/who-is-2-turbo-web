import React from "react";
import { Metadata } from "../Metadata/Metadata";
import { SeriesButton } from "../Button/SeriesButton";
import { Link } from "gatsby";
import { Toolbar } from "../Toolbar/Toolbar";

export const PlayChoice = () => (
  <main className="h-screen">
    <Metadata/>
    <>
      <Toolbar title="Categories" buttonLabel="Back"/>
      <section className="px-4 flex flex-col gap-y-2 py-4 md:h-4/5 md:justify-center items-center">
        <Link to="/app/play?series=5">
          <SeriesButton series={5}/>
        </Link>
        <Link to="/app/play?series=20">
          <SeriesButton series={20}/>
        </Link>
      </section>
    </>
  </main>
)
