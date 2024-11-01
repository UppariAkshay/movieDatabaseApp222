import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import MovieCard from '../MovieCard'
import './index.css'

class TopRated extends Component {
  state = {imageUrlObj: [], topRatedMovies: [], isLoading: true}

  componentDidMount() {
    this.fetchTopRatedMovies()
    this.getImageUrl()
  }

  fetchTopRatedMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=233fd27f49d413d33cd813789cfbcd8c&language=en-US&page=1',
    )
    const responseData = await response.json()
    this.setState({topRatedMovies: responseData.results})
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
    this.setState({imageUrlObj: responseData.images, isLoading: false})
  }

  displayTopRatedMovies() {
    const {topRatedMovies, imageUrlObj} = this.state
    return (
      <>
        <NavBar />
        <ul className="topRatedMoviesContainerUL">
          {topRatedMovies.map(eachMovie => (
            <MovieCard
              key={eachMovie.id}
              imagesUrlObjs={imageUrlObj}
              movieDetails={eachMovie}
            />
          ))}
        </ul>
      </>
    )
  }

  // movieCard(movieDetails) {
  //   const {imageUrlObj} = this.state
  //   const posterUrl =
  //     imageUrlObj.base_url +
  //     imageUrlObj.poster_sizes[4] +
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
  render() {
    const {isLoading} = this.state
    return (
      <div>
        {isLoading === true ? <Loader /> : this.displayTopRatedMovies()}
      </div>
    )
  }
}
export default TopRated
