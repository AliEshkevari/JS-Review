const fetchMock = require("jest-fetch-mock");
fetchMock.enableMocks();

const {
  getMovies,
  addMovie,
  deleteMovie
} = require("./script");
const { describe } = require("yargs");
const { beforeEach, default: test } = require("node:test");

const mockMovies = [
  {
    id: 1,
    name: "Dancer in the dark (v2)",
    year: 2000,
    director: "Lars Von Trier",
    genre: "Drama",
    rating: 9.1,
  },
  {
    id: "2",
    name: "The prestige",
    year: 2006,
    director: "Christopher Nolan",
    genre: "Mystery",
    rating: 8.8,
  },
  {
    id: "3",
    name: "Amelie",
    year: 2001,
    director: "Jean-Pierre jeunet",
    genre: "Romance",
    rating: 8.3,
  },
];

describe("Movie Data Handling functions", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  describe("getMovies", () => {
    test("Movie fetching successful", async () => {
      fetch.mockResponseOnce(JSON.stringify(mockMovies));
      let movies = await getMovies();
      expect(movies).toEqual(mockMovies);
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/movies");
    });
  });
  test("fetch errors", async () => {
    fetch.mockReject(new Error("Fetch unsuccessful"));
    let movies = await getMovies();
    expect(movies).toEqual([]);
  });

  describe("addMovie", () => {
    test("movie added successfully", async () => {
      let newMovie = {
        id: "4",
        name: "Inception",
        year: 2010,
        director: "Christopher Nolan",
        genre: "Sci-fi",
        rating: 8.8,
      };
      fetch.mockResponse(JSON.stringify(newMovie))
      let result = await addMovie('Inception', 2010, 'Christopher Nolan', 8.8)
      expect(result).toEqual(newMovie)
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/movies", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: 'Inception', year: 2010, director: 'Christopher Nolan', genre: 'Sci-fi', rating: 8.8})
      })
    });
    test('addMovie errors', async () => {
        fetch.mockReject(new Error('Movie not added'))
        let result = await addMovie('Inception', 2010, 'Christopher Nolan', 'Sci-fi', 8.8)
        expect(result).toBeNull()
    })
  });

  describe('deleteMovie', () =>{
    test('Movie deleted successfully', async () =>{
        fetch.mockResponseOnce(JSON.stringify({}))
        let result = await deleteMovie(1)
        expect(result).toBe(true)
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/movies", {
            method: 'DELETE'
        })
    })
    test('deleteMovie error', async () =>{
        fetch.mockReject(new Error('Movie not deleted'))
        let result = await(deleteMovie(1))
        expect(result).toBe(false)
    })
  })

  describe('editMovie', () => {
    test('updates a movie successfully', async () => {
      const updatedMovie = { id: 2, name: 'The prestige Updated', year: 2006, director: 'Christopher Nolan', genre: 'Mystery', rating: 8.8 };
      fetch.mockResponseOnce(JSON.stringify(updatedMovie));
      const result = await editMovie(1, { name: 'The prestige Updated', rating: 9.0 });
      expect(result).toEqual(updatedMovie);
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/movies/2', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'The prestige Updated', rating: 9.0 })
      });
    });

    test('handles edit movie error', async () => {
      fetch.mockReject(new Error('Failed to update movie'));
      const result = await editMovie(1, { name: 'The prestige Updated' });
      expect(result).toBeNull();
    });
  });


});
