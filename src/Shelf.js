import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    onMoveBook: PropTypes.func.isRequired
  };

  getShelfName = (shelf) => {
    switch (shelf) {
      case 'currentlyReading':
        return 'Currently Reading'
      case 'wantToRead':
        return 'Want To Read'
      case 'read':
        return 'Read'
      default:
        return ''
    }
  }

  render () {
    const currentShelvedBooks = this.props.allBooks.filter(
      (b) => b.shelf === this.props.shelf
    )

    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">
              {this.getShelfName(this.props.shelf)}
            </h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {currentShelvedBooks.map((book) => (
                  <li key={book.id}>
                    <Book book={book} onMoveBook={this.props.onMoveBook} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Shelf
