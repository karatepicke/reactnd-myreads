<<<<<<< HEAD
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
=======
import React from 'react';
import { Route } from 'react-router-dom';
import * as APIfunctions from './BooksAPI';
import './App.css';
import MainPage from './Components/Pages/MainPage';
import SearchPage from './Components/Pages/SearchPage';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
>>>>>>> 0d20865a56f91c29854c007b0183c60f8b5e3ee1
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
<<<<<<< HEAD
=======
      books: []
    }
    this.fetchBooks = this.fetchBooks.bind(this)
>>>>>>> 0d20865a56f91c29854c007b0183c60f8b5e3ee1
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    APIfunctions.getAll().then((books) => {
      this.setState({ books })
    })
      .catch(error => {
      });
  }

  render() {
    return (
<<<<<<< HEAD
      <div className='app'>
        <Route exact path='/search' component={ SearchPage } />
        <Route exact path='/' component= { BooksList } />
        {/* <Route path='/book/:id' component= { BookPage } /> */}
=======
      <div className="app">
        <Route exact path='/'
          component={MainPage}
          updateComponent={this.updateBook}
          books={this.state.books}
          crBooks={this.state.crBooks}
          wtrBooks={this.state.wtrBooks}
          rBooks={this.state.rBooks}
        />
        <Route path='/search'
          component={SearchPage}
        />
>>>>>>> 0d20865a56f91c29854c007b0183c60f8b5e3ee1
      </div>
    )
  }
}

export default BooksApp;
