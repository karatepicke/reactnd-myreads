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
        <Route path='/search' render={() => (
          <SearchPage
            books={this.state.books}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp;
