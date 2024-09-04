import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moviecards from './Moviecards';
import Pagination from './Pagination';

function Movies({handleAddtoWatchlist , handleRemoveFromWatchList, watchlist}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setpageNo] = useState(1)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlePrev = ()=>{
    if(pageNo==1){
      setpageNo(1)
    }
    else{
      setpageNo(pageNo-1)
    }
  }
  

  const handlNext = ()=>{
    setpageNo(pageNo+1)
  }

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=3da4fc0b429e353b1f860a36402487ec&language=en-US&page=${pageNo}`)
      .then(response => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch movies');
        setLoading(false);
      });
  }, [pageNo]);

  if (loading) return <div className="p-5 text-center">Loading...</div>;
  if (error) return <div className="p-5 text-center text-red-500">{error}</div>;

  return (
    <div className='p-5'>
      <div className='text-2xl m-5 font-bold text-center'>
        Trending Movies
      </div>
      <div className='flex flex-row flex-wrap justify-around gap-8'>
        {movies.map((movieobj) =>{
          return <Moviecards key={movieobj.id} movieobj={movieobj} poster_path={movieobj.poster_path} name={movieobj.original_title} handleAddtoWatchlist={handleAddtoWatchlist} handleRemoveFromWatchList={handleRemoveFromWatchList} watchlist={watchlist} />
        })}
      </div>
      <Pagination pageNo={pageNo} handlePrev={handlePrev} handlNext={handlNext} />
    </div>
  );
}

export default Movies;
