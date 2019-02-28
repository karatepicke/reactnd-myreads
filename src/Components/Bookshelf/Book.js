import React from 'react';
// import ShelfChanger from './ShelfChanger';

class Book extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myShelf: ''
    }
    this.handleChange = (event) => {
      this.setState({ myShelf: event.target.value });
    }
  }

  componentDidMount() {
    this.setState({ myShelf: this.props.book.shelf });
  }

  render() {
    return (
      <div className='book'>
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
          {/* <ShelfChanger onChangeShelf={this.handleChange} /> */}
          <div className="book-shelf-changer">
            <select value={this.state.myShelf || "none"} onChange={(e) => { this.props.updateBook(this.props.book, e.target.value) }}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading"  >Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.author}</div>
      </div>
    )
  }
}

export default Book;