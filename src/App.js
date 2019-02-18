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
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
      books: []
    }
    this.fetchBooks = this.fetchBooks.bind(this)
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
      </div>
    )
  }
}

export default BooksApp;
