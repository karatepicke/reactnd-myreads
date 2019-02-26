// External Depedencies
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import Book from '../Bookshelf/Book';


class Search extends React.Component {

    state = {
        query: '',
        results: [],
        isEmpty: false,
        isLoading: false,
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

        BooksAPI.search(query)
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

    render () {
        const { isEmpty, isLoading } = this.state

        return (
            <div className="search-container">
                <div className="search-books-bar">
                  <Link className="close-search" to="/">Close</Link>
                  <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" value={this.state.query}
                      onChange={(event) => this.handleInputChange(event)} />
                  </div>
                </div>

                {isLoading && (
                    <div className="results-loading">
                    </div>
                )}

                {isEmpty && (
                    <div className="no-results">
                        Sorry, no results were found.<br/>
                        Your search '<b>{this.state.query}</b>' did not match any books.
                        <span className="emotion">¯\_(ツ)_/¯</span>
                    </div>
                )}

                {this.state.results.length > 0 && (
                    <div className="results-details">
                        <b>{this.state.results.length}</b> results found.
                    </div>
                )}

                <ul className="results">
                    {this.state.results.map((book, index) => (
                      <Book key={book.id} data={book} onUpdateBook={this.props.onUpdateBook} />
                    ))}
                </ul>
            </div>
        )
    }
}

Search.defaultProps = {
    myBooks: [],
    onUpdateBook: () => {}
}

Search.propTypes = {
    myBooks: PropTypes.array,
    onUpdateBook: PropTypes.func
}

export default Search;
