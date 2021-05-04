import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveBook: PropTypes.func.isRequired
  };

  changeFunc = (e) => {
    const value = e.target.value
    this.props.onMoveBook(this.props.book, value)
  };

  getDefaultValue = (shelf) => {
    return shelf === undefined ? 'none' : shelf
  }

  render () {
    const thumbnail =
      this.props.book.imageLinks &&
      this.props.book.imageLinks.thumbnail !== undefined
        ? this.props.book.imageLinks.thumbnail
        : ''
    return (
      <div className="book">
        {this.props.book && (
          <div>
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url("${thumbnail}")`
                }}
              ></div>
              <div className="book-shelf-changer">
                <select
                  value={this.getDefaultValue(this.props.book.shelf)}
                  onChange={this.changeFunc}
                >
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">
                    None
                  </option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.book.title}</div>
            {this.props.book &&
              this.props.book.authors &&
              this.props.book.authors.map((author) => {
                return (
                  <div key={author} className="book-authors">
                    {author}
                  </div>
                )
              })}
          </div>
        )}
      </div>
    )
  }
}

export default Book
