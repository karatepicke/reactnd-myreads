import React from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf';

class BooksList extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    BooksAPI.getAll().then(books => {

    })
  }

  render() {
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf bookshelfTitle='Currently Reading' />
            <Bookshelf bookshelfTitle='Want to Read' />
            <Bookshelf bookshelfTitle='Read' />
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>
    )
  }
}

export default BooksList;
