// External Depedencies
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as APIfunctions from '../../BooksAPI';
import Book from '../Bookshelf/Book';


class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        query: '',
        results: [],
        isEmpty: false,
        isLoading: false,
    }
    this.updateBook = this.updateBook.bind(this);
  }

    handleInputChange = (e) => {
        this.setState({query: e.target.value})
        this.findBooks(e.target.value);
    }

    findBooks = (query) => {
        if(query.trim() === '') {
            this.setState({results: [], isEmpty: false, isLoading: false})
            return;
        }
        
        this.setState({results: [], isEmpty: false, isLoading: true})

        APIfunctions.search(query)
            .then((response) => {
                // check if the query is the same of the input value 
                const emptyResponse = !!response.error
                const results = emptyResponse ? [] : response

                // adding shelf properties
                results.forEach(item => {
                    const myBook = this.props.myBooks.find(elem => elem.id === item.id)
                    if(myBook) item.shelf = myBook.shelf
                })

                this.setState({results, isEmpty: emptyResponse, isLoading: false})
            });
    }

    updateBook = (book, shelf) => {
      console.log(book)
      APIfunctions.update(book, shelf)
        .then(resp => {
          book.shelf = shelf;
          this.setState({ book });
          console.log(resp)
        });
    }

    render () {
        const { isEmpty, isLoading } = this.state

        return (
          <div className="search-container">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by Title or Author" value={this.state.query}
                  onChange={(event) => this.handleInputChange(event)} />
              </div>
            </div>

            {/* {isLoading && (
                <div className="results-loading">
                </div>
            )} */}

            <div className="message-container">
              {isEmpty && (
                'Your search did not return any results.'
              )}
              {this.state.results.length > 0 && (
                `${this.state.results.length} results found...`
              )}
            </div>

            <ol className="books-grid results">
                {this.state.results.map((book) => (
                  <li key={book.id}>
                    <Book 
                      updateBook={this.updateBook}
                      book={book}
                      />
                  </li>
                ))}
            </ol>
          </div>
        )
    }
}

SearchPage.defaultProps = {
    myBooks: [],
    onUpdateBook: () => {}
}

SearchPage.propTypes = {
    myBooks: PropTypes.array,
    onUpdateBook: PropTypes.func
}

export default SearchPage;
