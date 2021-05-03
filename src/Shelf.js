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
  };

  // filter the books based on this.prop.shelf and display those

  render() {
    let currentShelvedBooks = [];
    this.props.shelf === "currentlyReading"
      ? (currentShelvedBooks = this.props.shelvedBooks.currentlyReading)
      : this.props.shelf === "wantToRead"
      ? (currentShelvedBooks = this.props.shelvedBooks.wantToRead)
      : this.props.shelf === "read"
      ? (currentShelvedBooks = this.props.shelvedBooks.read)
      : (currentShelvedBooks = []);
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelf}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.allBooks.map((book) => (
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
