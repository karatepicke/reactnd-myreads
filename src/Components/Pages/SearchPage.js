// External Depedencies
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as APIfunctions from '../../BooksAPI';
import Book from '../Bookshelf/Book'


class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      isEmpty: true
    }
    this.updateBook = this.updateBook.bind(this);
  }

  handleInputChange = (e) => {
    this.setState({ query: e.target.value })
    this.findBooks(e.target.value);
  }

  findBooks = (query) => {
    if (query.trim() === '') {
      this.setState({ results: [] })
      return;
    }
    this.setState({ results: [], isEmpty: false })

    APIfunctions.search(query)
      .then((response) => {
        // check if the query is the same of the input value
        const emptyResponse = !!response.error
        const results = emptyResponse ? [] : response

        // add the shelf-property
        results.forEach(item => {
          const book = this.props.books.find((elem) => elem.id === item.id)

          if (book) {
            item.shelf = book.shelf
          }
        })
        this.setState({ results, isEmpty: emptyResponse })
      });
  }

  updateBook = (book, shelf) => {
    APIfunctions.update(book, shelf)
      .then(resp => {
        book.shelf = shelf;
        this.setState({ book });
      });
  }

  setResultMessage() {
    if (this.state.isEmpty === true) {
      return 'Your search did not return any results.'
    } else {
      return `${this.state.results.length} results found.`
    }
  }

  render() {
    const isEmpty = this.state

    return (
      <div className="search-container">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by Title or Author" value={this.state.query}
              onChange={(event) => this.handleInputChange(event)} />
          </div>
        </div>

        <div className="message-container">
          {this.setResultMessage(isEmpty)}
        </div>

        <ol className="books-grid results">
          {this.state.results.map((book) => (
            <li key={book.id}>
              <Book
                updateBook={this.updateBook}
                shelf={book.shelf}
                book={book}
              />
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default SearchPage;
