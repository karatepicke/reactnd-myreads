import React from 'react';
import * as APIfunctions from './BooksAPI';
import './App.css';
import Bookshelf from './Components/Bookshelf/Bookshelf';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchPage: false,
      /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
      books: [],
      crBooks: [],
      wtrBooks: [],
      rBooks: []
    }
    this.fetchBooks = this.fetchBooks.bind(this)
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    console.log('API called')
    APIfunctions.getAll().then((books) => {
      this.setState({ books })
      this.sortBooksOnce();
    })
      .catch(error => {
        console.log(error)
      });
  }

  sortBooksOnce() {
    const allBooks = this.state.books
    const crBooks = [], wtrBooks = [], rBooks = []

    console.log('sortBooks function')
    allBooks.forEach(book => {
      if (book.shelf === 'currentlyReading') {
        crBooks.push(book)
      } else if (book.shelf === 'wantToRead') {
        wtrBooks.push(book)
      } else {
        rBooks.push(book)
      }
    })
    this.setState({
      crBooks: crBooks,
      wtrBooks: wtrBooks,
      rBooks: rBooks
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf
                    onBooksChanged={this.fetchBooks}
                    shelfTitle={'Currently Reading'}
                    shelfId={'currentlyReading'}
                    books={this.state.crBooks}
                  />
                  <Bookshelf
                    onBooksChanged={this.fetchBooks}
                    shelfTitle={'Want to Read'}
                    shelfId={'wantToRead'}
                    books={this.state.wtrBooks}
                  />
                  <Bookshelf
                    onBooksChanged={this.fetchBooks}
                    shelfTitle={'Read'}
                    shelfId={'read'}
                    books={this.state.rBooks}
                  />
                </div>
              </div>
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
