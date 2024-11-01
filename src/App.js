import './App.css'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieInDetail from './components/MovieInDetail'
import SearchedMovies from './components/SearchedMovies'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={Upcoming} />
    <Route exact path="/movie-in-detail/:movieID" component={MovieInDetail} />
    <Route
      exact
      path="/search-movies/:searchKeyword"
      component={SearchedMovies}
    />
  </Switch>
)

export default App
