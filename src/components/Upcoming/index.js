import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import MovieCard from '../MovieCard'
import './index.css'

class Upcoming extends Component {
  state = {upcomingMovies: [], imagesUrlObjs: [], isLoading: true}

  componentDidMount() {
    this.fetchUpcomingMovies()
    this.getImageUrl()
  }

  fetchUpcomingMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/upcoming?api_key=233fd27f49d413d33cd813789cfbcd8c&language=en-US&page=1',
    )
    const responseData = await response.json()
    this.setState({upcomingMovies: responseData.results})
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
    console.log(responseData)
    this.setState({imagesUrlObjs: responseData.images, isLoading: false})
  }

  displayUpcomingMovies() {
    const {upcomingMovies, imagesUrlObjs} = this.state
    return (
      <>
        <NavBar />
        <ul className="upcomingMoviesContainerUL">
          {upcomingMovies.map(eachMovie => (
            <MovieCard
              key={eachMovie.id}
              imagesUrlObjs={imagesUrlObjs}
              movieDetails={eachMovie}
            />
          ))}
        </ul>
      </>
    )
  }

  movieCard(movieDetails) {
    const {imagesUrlObjs} = this.state
    console.log(imagesUrlObjs)
    const posterUrl =
      imagesUrlObjs.base_url +
      imagesUrlObjs.poster_sizes[4] +
      movieDetails.poster_path
    console.log(posterUrl)
    return (
      <li>
        <img src={posterUrl} alt={movieDetails.title} />
        <p>{movieDetails.title}</p>
        <p>{movieDetails.vote_average}</p>
        <button>View Details</button>
      </li>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        {isLoading === true ? <Loader /> : this.displayUpcomingMovies()}
      </div>
    )
  }
}
export default Upcoming
