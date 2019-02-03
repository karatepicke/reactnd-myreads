import React from 'react';
import * as APIfunctions from '../../BooksAPI';
import Book from './Book';

class Bookshelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      matchingBooks: []
    }
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

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => {
              return (
                <li key={book.id}>
                  <Book
                    book={book}
                    updateBook={this.updateBook}
                    id={book.id}
                    title={book.title}
                    coverUrl={book.imageLinks.thumbnail}
                    author={book.authors}
                    shelf={book.shelf}
                  />
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf;