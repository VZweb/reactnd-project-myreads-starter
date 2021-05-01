import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class Shelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }
  state = {
    query: "",
  }

  render() {
    let currentShelvedBooks = []
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelf}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.shelf === "Currently Reading"
                  ? (currentShelvedBooks = this.props.shelvedBooks.currentlyReadingBooks)
                  : this.props.shelf === "Want To Read"
                  ? (currentShelvedBooks = this.props.shelvedBooks.wantToReadBooks)
                  : this.props.shelf === "Read"
                  ? (currentShelvedBooks = this.props.shelvedBooks.readBooks)
                  : this.props.shelf === "None"
                  ? (currentShelvedBooks = this.props.shelvedBooks.noneBooks)
                  : []}
                {currentShelvedBooks.map((book) => (
                  <li>
                    <Book book={book} onMoveBook={this.props.onMoveBook} />
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
