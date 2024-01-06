import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Card } from "../component/card";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const { title, overview, poster_path, release_date } = store.movie || {};
  const { results } = store;

  useEffect(() => {
  }, []);

  const handleGetMovieList = async () => {
	actions.getMovieList()
	// actions.getMovieList2()
  }

  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  const groupedResults = chunkArray(results, 4);

  return (
    <div className="text-center mt-5">
      <Card title={title} overview={overview} poster_path={poster_path} release_date={release_date} />
      <button onClick={() => actions.getMovie()}>Get movie</button>
	  <button onClick={() => handleGetMovieList()}>Get movie List</button>
      {groupedResults.map((group, groupIndex) => (
        <div key={groupIndex} className="row justify-content-center">
          {group.map((movie, index) => (
            <div key={index} className="col-3">
              <Card title={movie.title} overview={movie.overview} poster_path={movie.poster_path} release_date={movie.release_date} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};