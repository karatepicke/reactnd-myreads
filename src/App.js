import './App.css'
import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import BooksList from './BooksList'
import SearchPage from './pages/SearchPage';

// import MainPage from './components/pages/MainPage';
// import BookPage from './components/pages/BookPage';


class BooksApp extends React.Component {
  state = {
    books: []
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }
  
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/search' component={ SearchPage } />
        <Route exact path='/' component= { BooksList } />
        {/* <Route path='/book/:id' component= { BookPage } /> */}
      </div>
    )
  }
}

export default BooksApp;
