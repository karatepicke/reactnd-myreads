import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Bookshelf extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="bookshelf" >
        <h2 className="bookshelf-title">{this.props.bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <Book />
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf