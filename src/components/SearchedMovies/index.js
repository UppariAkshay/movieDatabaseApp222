import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import './index.css'

class SearchedMovies extends Component {
  state = {searchedMovies: [], isLoading: true, imagesUrlObjs: []}

  componentDidMount() {
    this.searchMovies()
    this.getImageUrl()
  }

  searchMovies = async () => {
    const {match} = this.props
    const {params} = match
    const {searchKeyword} = params

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=233fd27f49d413d33cd813789cfbcd8c&language=en-US&query=${searchKeyword}&page=1`,
    )
    const responseData = await response.json()

    this.setState({searchedMovies: responseData.results})
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

  displaySearchedMovies = () => {
    const {searchedMovies, imagesUrlObjs} = this.state

    return searchedMovies.map(eachMovie => (
      <MovieCard
        key={eachMovie.id}
        imagesUrlObjs={imagesUrlObjs}
        movieDetails={eachMovie}
      />
    ))
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? <Loader /> : this.displaySearchedMovies()
  }
}

export default SearchedMovies
