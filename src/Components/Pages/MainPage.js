import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from '../Bookshelf/Bookshelf';
import * as APIfunctions from '../../BooksAPI';

class MainPage extends React.Component {
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
              books={this.state.books}
            />
            <Bookshelf
              onBooksChanged={this.fetchBooks}
              shelfTitle={'Want to Read'}
              shelfId={'wantToRead'}
              books={this.state.books}
            />
            <Bookshelf
              onBooksChanged={this.fetchBooks}
              shelfTitle={'Read'}
              shelfId={'read'}
              books={this.state.books}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MainPage;