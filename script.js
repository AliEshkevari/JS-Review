async function getMovies() {
  try {
    const res = await fetch("http://localhost:3000/movies");
    if (!res.ok) {
      throw new Error("Failed");
    }
    const movies = await res.json();

    return movies;
  } catch (err) {
    console.error(err);
  }
}

const movies = await getMovies();
// console.log(movies)

const lowRated = movies.filter((movie) => movie.rating < 8.0);
// console.log(lowRated)

const movieDetails = movies.map((movie) => ({
  name: movie.name,
  rating: movie.rating,
}));

// console.log(movieDetails)



const ratingIsEqual = (movie1Name, movie2Name) =>{
  // if((!(movies.map(movie => movie.name)).includes(movie1)) && (!(movies.map(movie => movie.name)).includes(movie2))) {
  //   return 'Movie doesn\'t exist'
  // } else {
  //   console.log(movie1.rating, movie2)
  //   return movie1.rating === movie2.rating
  // }

  let movie1 = movies.find((movie) => movie.name === movie1Name)
  let movie2 = movies.find((movie) => movie.name === movie2Name)

  console.log(movie1.rating)
  console.log(movie2.rating)
  // (!movie1 || !movie2) ? 'Movie doesn\t exist' : movie1.rating === movie2.rating

  if(!movie1 || !movie2) return 'Movie doesn\t exist'
  return movie1.rating === movie2.rating

}

// console.log(movies.map(movie => movie.name))
console.log(ratingIsEqual('Amelie', 'Inception'))