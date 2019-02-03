import React from 'react';
import * as APIfunctions from '../../BooksAPI';
import Book from './Book';

class Bookshelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
    this.updateBook = this.updateBook.bind(this)
  }

  componentDidMount() {

  }

  updateBook = (book, shelf) => {
    console.log(book)
    APIfunctions.update(book, shelf)
      .then(resp => {
        book.shelf = shelf;
        this.setState({ book });
        console.log(resp)
      });
    this.props.onBooksChanged();
  }

  filterBooks() {
    const filteredBooks = this.props.books.map((book) => {
      if (book.shelf === this.props.shelfId) {
        return (
          <li key={book.id}>
            <Book
              updateBook={this.updateBook}
              book={book}
              id={book.id}
              title={book.title}
              coverUrl={book.imageLinks.thumbnail}
              author={book.authors}
              shelf={book.shelf}
            />
          </li>
        )
      }
    })
    return (filteredBooks)
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.filterBooks()
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf;