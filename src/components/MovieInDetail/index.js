import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class MovieInDetail extends Component {
  state = {
    allDetailsAboutMovie: [],
    movieCast: [],
    isLoading: true,
    imageUrlObj: [],
  }

  componentDidMount() {
    this.fetchMovieInDetail()
    this.fetchCast()
    this.getImageUrl()
  }

  fetchMovieInDetail = async () => {
    const {match} = this.props
    const {params} = match
    const {movieID} = params

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=233fd27f49d413d33cd813789cfbcd8c&language=en-US`,
    )
    const responseData = await response.json()

    this.setState({allDetailsAboutMovie: responseData})
  }

  fetchCast = async () => {
    const {match} = this.props
    const {params} = match
    const {movieID} = params
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=233fd27f49d413d33cd813789cfbcd8c&language=en-US`,
    )
    const responseData = await response.json()
    this.setState({movieCast: responseData.cast})
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

  displayDetailedMovieView = () => {
    const {movieCast} = this.state
    return (
      <div>
        {this.displayAboutMovie()}
        {movieCast.map(eachChar => this.displayMovieCast(eachChar))}
      </div>
    )
  }

  displayAboutMovie = () => {
    const {allDetailsAboutMovie, movieCast, imageUrlObj} = this.state
    const imageUrl = imageUrlObj.secure_base_url + imageUrlObj.poster_sizes[4]

    return (
      <>
        <img
          src={imageUrl + allDetailsAboutMovie.poster_path}
          alt={allDetailsAboutMovie.title}
        />
        <p>Title: {allDetailsAboutMovie.title}</p>
        <p>Ratings: {allDetailsAboutMovie.vote_average}</p>
        <p>Duration: {allDetailsAboutMovie.runtime}</p>
        <ul>
          {allDetailsAboutMovie.genres.map(eachGenre => (
            <li>{eachGenre.name}</li>
          ))}
        </ul>
        <p>Release Date: {allDetailsAboutMovie.release_date}</p>
        <p>Overview: {allDetailsAboutMovie.overview}</p>
      </>
    )
  }

  displayMovieCast = personDetail => {
    const {imageUrlObj} = this.state
    const castImageUrl =
      imageUrlObj.secure_base_url + imageUrlObj.profile_sizes[1]
    console.log(castImageUrl + personDetail.profile_path)
    return (
      <>
        <img
          src={castImageUrl + personDetail.profile_path}
          alt={personDetail.name}
        />
        <p>{personDetail.name}</p>
        <p>{personDetail.original_name}</p>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return isLoading ? <Loader /> : this.displayDetailedMovieView()
  }
}

export default MovieInDetail
