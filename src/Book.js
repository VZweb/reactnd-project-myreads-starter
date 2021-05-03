import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";
import * as BooksAPI from "./BooksAPI";

class Book extends Component {
  state = {
    book: [],
  };
  changeFunc = (e) => {
    const value = e.target.value;
    this.props.onMoveBook(this.state.book, value);
  };

  componentDidMount() {
    // BooksAPI.get(this.props.bookId).then((book) => {
    //   this.setState(() => ({
    //     book,
    //   }));
    // });
  }

  render() {
    return (
      <div className="book">
          {this.props.book && (<div><div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")`,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select value ={this.props.book.shelf} onChange={this.changeFunc}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors[0]}</div></div>)}
      </div>
    );
  }
}

export default Book;
