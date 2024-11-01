import {Component} from 'react'
import './index.css'
import {Link, withRouter} from 'react-router-dom'

class NavBar extends Component {
  state = {searchKeyword: ''}

  onChangeSearchKeyword = event => {
    this.setState({searchKeyword: event.target.value})
  }

  onClickSearch = () => {
    const {searchKeyword} = this.state
    const {history} = this.props

    history.push(`/search-movies/${searchKeyword}`)
  }

  render() {
    return (
      <nav className="movieDbNAV">
        <h1>movieDB</h1>
        <div className="navOptionsContainerDIV">
          <Link to="/">
            <button className="removeBtnStyles">Popular</button>
          </Link>
          <Link to="/top-rated">
            <button className="removeBtnStyles">Top Rated</button>
          </Link>
          <Link to="/upcoming">
            <button className="removeBtnStyles">Upcoming</button>
          </Link>
        </div>
        <div>
          <input onChange={this.onChangeSearchKeyword} type="search" />
          <button onClick={this.onClickSearch}>Search</button>
        </div>
      </nav>
    )
  }
}
export default withRouter(NavBar)
