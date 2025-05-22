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
// console.log(ratingIsEqual('Amelie', 'Inception'))


// average rating
let avgRating = movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length

// console.log('Average rating is', avgRating.toFixed(2))


const topRatedMovies = movies.sort((a, b) => b.rating - a.rating).map((movie) => ({
  name: movie.name,
  rating: movie.rating
}))

// console.log(topRatedMovies)


const topRatedByGenre = (genre) => {
  let topRatedMoviesByGenre = movies.filter(movie => movie.genre === genre).sort((a,b) => b.rating - a.rating).map((movie) => ({
    name: movie.name,
    rating: movie.rating
  }))

  const list = topRatedMoviesByGenre.map(movie => `${movie.name}: ${movie.rating}`).join('\n')

  return `Top rated ${genre} movies are as follows: \n${list}`
}


let topRatedDramaMovies = movies.filter(movie => movie.genre === 'Drama').sort((a,b) => b.rating - a.rating).map((movie) => ({
  name: movie.name,
  rating: movie.rating
}))

// console.log('Top rated drama movies are as follows: ', topRatedDramaMovies)
// console.log(topRatedByGenre('Drama'))


// didn't work:
// const moviesGroupedByGenre = (movies) => {
//   const result = [{}]
//   for(let movie of movies) {
//     let genre = movie.genre
//     result[0][genre] = [...result[0][genre], movie]
//   }
//   return result
// }

// console.log(moviesGroupedByGenre(movies))



const moviesGroupedByGenre = (movies) => {
  let result = Object.groupBy(movies, movie => movie.genre)
  return result
}

// console.log(moviesGroupedByGenre(movies))



const findEqualRatedMovies = (movies, movieName) => {
  let targetMovie = movies.find(movie => movie.name === movieName)
  if(!targetMovie) return `Movie with name ${movieName} not found. try another one`

  let equalRatedMovies = movies.filter(movie => (movie.name !== movieName) && movie.rating === targetMovie.rating).map(movie => `${movie.name}`)

  return `Movies with a rating equal to ${movieName} with rating ${targetMovie.rating} movie are: \n${equalRatedMovies.join('\n')}`
}

// console.log(findEqualRatedMovies(movies, 'Inception'))




async function addMovie(name, year, director, genre, rating){
  try{
    let newMovie = {name, year, director, genre, rating}
    let res =  await fetch('http://localhost:3000/movies', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMovie)
    })
    if(!res.ok) throw new Error('Movie not added.')
    let addedMovie = await res.json()
    return addedMovie
  } catch(err){
    console.error('Movie not added.', err.message)
    return
  }
}


// addMovie('12 angry men', 1957, "Sydney Lumet", "Drama", 9.0)


async function deleteMovie(movieId){
  try{
    let res = await fetch(`http://localhost:3000/movies/${movieId}`, {
      method: 'DELETE'
    })
    if(!res.ok) throw new Error('Movie not deleted.')
    let deletedMovie = await res.json()
  console.log(deletedMovie)
  return true
  } catch(err){
    console.error('Movie not deleted.', err.message)
    return
  }
}

// deleteMovie("f198")
// deleteMovie("8a75")


async function updateMovie(movieId, info){
  try{
    let res = await fetch(`http://localhost:3000/movies/${movieId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    if(!res.ok) throw new Error('Movie not updated.')
    let updatedMovie = await res.json()
    return updatedMovie
  } catch(err){
    console.error('Movie not updated.', err)
    return
  }
}

// updateMovie(1, {
//   name: 'Dancer in the dark (v2)',
//   rating: 9.1
// })



