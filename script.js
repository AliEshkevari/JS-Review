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
