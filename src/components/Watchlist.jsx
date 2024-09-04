import React, { useEffect } from "react";
import { useState } from "react";
import genreids from '../Utility/genre'

function Watchlist({ watchlist, setwatchlist, handleRemoveFromWatchList }) {
  const [search, setsearch] = useState("");
  const [genreList, setgenreList] = useState(['All Genre'])
  const [currentGenre, setcurrentGenre] = useState('All Genre')

  let handleSearch = (e) => {
    setsearch(e.target.value);
  };

  let handleFilter = (genre)=>{
    setcurrentGenre(genre)
  }

  let sortIncreasing = () => {
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });

    setwatchlist([...sortedIncreasing]);
  };

  let sortDecreasing = () => {
    let sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });

    setwatchlist([...sortedDecreasing]);
  };

  let sortIncPopularity = () => {
    let sortedIncPopularity = watchlist.sort((movieA, movieB) => {
      return movieA.popularity - movieB.popularity;
    });

    setwatchlist([...sortedIncPopularity]);
  };

  let sortDecPopularity = () => {
    let sortedDecPopularity = watchlist.sort((movieA, movieB) => {
      return movieB.popularity - movieA.popularity;
    });

    setwatchlist([...sortedDecPopularity]);
  };

  useEffect(()=>{
    let temp = watchlist.map((movieobj)=>{
      return genreids[movieobj.genre_ids[0]]
    })
    temp = new Set(temp)
    setgenreList(['All Genre', ...temp])
    console.log(temp)
  },[watchlist])

  return (
    <>
      <div className="flex justify-center flex-wrap gap-2">
        {genreList.map((genre)=>{
          return <div onClick={()=>handleFilter(genre)} className={ currentGenre==genre?" flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold " : " flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4 " }>
          {genre}
        </div>
        })}
      </div>

      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-300 outline-none px-4 rounded-xl"
        />
      </div>

      <div className=" overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
                <div onClick={sortIncreasing} className="p-2">
                  <i class="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">Ratings</div>
                <div onClick={sortDecreasing} className="p-2">
                  <i class="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>
                <div className="flex justify-center">
                  <div onClick={sortIncPopularity} className="p-2">
                    <i class="fa-solid fa-arrow-up"></i>
                  </div>
                  <div className="p-2">Popularity</div>
                  <div onClick={sortDecPopularity} className="p-2">
                    <i class="fa-solid fa-arrow-down"></i>
                  </div>
                </div>
              </th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>
            {watchlist.filter((movieobj)=>{
              if(currentGenre=='All Genre'){
                return true
              }else{
                return genreids[movieobj.genre_ids[0]]==currentGenre;
              }
            }).filter((movieobj) => {
                return movieobj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieobj) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6remm] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieobj.backdrop_path}`}
                      />
                      <div className="mx-10">{movieobj.title}</div>
                    </td>

                    <td>{movieobj.vote_average}</td>
                    <td>{movieobj.popularity}</td>
                    <td>{genreids[movieobj.genre_ids[0  ]]}</td>
                    <td onClick={() => handleRemoveFromWatchList(movieobj)} className="text-red-600 font-bold hover:cursor-pointer">
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
