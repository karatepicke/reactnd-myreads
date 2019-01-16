import React from 'react'
import * as APIfunctions from './BooksAPI'
import './App.css'
import Bookshelf from './Components/Bookshelf/Bookshelf'

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
  }

  componentDidMount() {
    APIfunctions.getAll().then((books) => {
      this.setState({ books })
      this.sortBooks();
    })
      .catch(error => {
        console.log(error)
      });
  }

  sortBooks() {
    const allBooks = this.state.books

    allBooks.forEach(book => {
      if (book.shelf === 'currentlyReading') {
        this.setState(prevState => ({
          crBooks: [...prevState.crBooks, book]
        }))
      } else if (book.shelf === 'wantToRead') {
        this.setState(prevState => ({
          wtrBooks: [...prevState.wtrBooks, book]
        }))
      } else {
        this.setState(prevState => ({
          rBooks: [...prevState.rBooks, book]
        }))
      }
    })
  }

  // changeBook = (changedBook) => {
  //   APIfunctions.update(changedBook, changedBook.shelf).then(() => {
  //     console.info(`updated '${changedBook.title}' to '${changedBook.shelf}'`)

  //     this.setState(state => ({
  //       books: state.books.filter(b => b.id !== changedBook.id).concat([changedBook])
  //     }))
  //   })
  // }

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
                  <Bookshelf shelfTitle={'Currently Reading'} books={this.state.crBooks} />
                  <Bookshelf shelfTitle={'Want to Read'} books={this.state.wtrBooks} />
                  <Bookshelf shelfTitle={'Read'} books={this.state.rBooks} />
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
