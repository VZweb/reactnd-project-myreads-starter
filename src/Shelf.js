import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class Shelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  };
  state = {
    query: "",
    book: [],
    currentShelvedBooks: []
  };

  render() {
    let currentShelvedBooks = this.props.allBooks.filter((b) => (
      b.shelf === this.props.shelf
    ))
 
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelf}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {currentShelvedBooks.map((book) => (
                  <li>
                    <Book
                      book={book}
                      onMoveBook={this.props.onMoveBook}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shelf;
