import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import MovieCard from '../MovieCard'
import './index.css'

class Home extends Component {
  state = {isLoading: true, popularMoviesList: [], imagesUrlObjs: []}

  componentDidMount() {
    this.fetchPopularMovies()
    this.getImageUrl()
  }

  fetchPopularMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=233fd27f49d413d33cd813789cfbcd8c&language=en-US&page=1',
    )
    const responseData = await response.json()
    this.setState({popularMoviesList: responseData.results})
  }

  getImageUrl = async () => {
    const url = 'https://api.themoviedb.org/3/configuration'
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzNmZDI3ZjQ5ZDQxM2QzM2NkODEzNzg5Y2ZiY2Q4YyIsIm5iZiI6MTcyOTE0ODMyMy4xOTMyODMsInN1YiI6IjY3MTBiMzBmY2Y4ZGU4NzdiNDlmYTNjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-D-jzjtxIyKg_owmCo554O1tFVmr-DjE2HRkVobZ_II',
      },
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    this.setState({imagesUrlObjs: responseData.images, isLoading: false})
  }

  // movieCard(movieDetails) {
  //   const {imagesUrlObjs} = this.state
  //   const imageSize = imagesUrlObjs.poster_sizes
  //   const posterUrl =
  //     imagesUrlObjs.base_url +
  //     imagesUrlObjs.poster_sizes[4] +
  //     movieDetails.poster_path
  //   return (
  //     <li>
  //       <img src={posterUrl} alt={movieDetails.title} />
  //       <p>{movieDetails.title}</p>
  //       <p>{movieDetails.vote_average}</p>
  //       <button>View Details</button>
  //     </li>
  //   )
  // }

  displayPopularMovies() {
    const {popularMoviesList, imagesUrlObjs} = this.state
    return (
      <ul className="moviesContainerUL">
        {popularMoviesList.map(eachMovie => (
          <MovieCard
            key={eachMovie.id}
            imagesUrlObjs={imagesUrlObjs}
            movieDetails={eachMovie}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <NavBar />
        {isLoading === true ? <Loader /> : this.displayPopularMovies()}
      </div>
    )
  }
}
export default Home
