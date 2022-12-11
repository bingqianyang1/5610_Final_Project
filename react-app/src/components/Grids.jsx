import React from "react";
import Grid from "./Grid";

export default function Grids({ movies }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

 
  return (
    <div>
      <Grid data={getMoviesFromRange(0, 10)} title="Christmas Picks" />
      <Grid data={getMoviesFromRange(10, 20)} title="New Releases" />
      <Grid
        data={getMoviesFromRange(20, 30)}
        title="Independent Cinema"
      />
      <Grid
        data={getMoviesFromRange(30, 40)}
        title="Top Shows"
      />
      <Grid data={getMoviesFromRange(40, 50)} title="Trending" />
      <Grid data={getMoviesFromRange(50, 60)} title="More to Explore" />
    </div>
  );
}





