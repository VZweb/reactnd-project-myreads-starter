import React from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelf from "./Shelf";
import Book from "./Book";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      shelvedBooks: {
        currentlyReading: [],
        wantToRead: [],
        read: []
      },
      showSearchPage: false,
      query: "",
      shelves: ["Currently Reading", "Want To Read", "Read"],
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState(() => ({
        allBooks,
      }));
    });
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };

  clearQuery = () => {
    this.updateQuery("");
  };

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((shelvedBooks) => {
      this.setState(() => ({
        shelvedBooks,
      }));
    });
  };

  render() {
    const { query, allBooks } = this.state;

    const showingBooks =
      query === "" ? allBooks : allBooks.filter((c) => c.title.includes(query));
    const shelves = Object.getOwnPropertyNames(this.state.shelvedBooks)
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Route
            exact
            path="/search"
            render={() => (
              <div className="search-allBooks">
                <div className="search-allBooks-bar">
                  <Link to="/">
                    <button
                      className="close-search"
                      onClick={() => this.setState({ showSearchPage: false })}
                    >
                      Close
                    </button>
                  </Link>
                  <div className="search-allBooks-input-wrapper">
                    {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                    <input
                      type="text"
                      placeholder="Search by title or author"
                      value={query}
                      onChange={(event) => this.updateQuery(event.target.value)}
                    />
                  </div>
                </div>
                <div className="search-allBooks-results">
                  <ol className="allBooks-grid">
                    {showingBooks.length !== allBooks.length && (
                      <div className="showing-allBooks">
                        <span>
                          Now showing {showingBooks.length} of {allBooks.length}
                        </span>
                        <button onClick={this.clearQuery}>Show all</button>
                        {showingBooks.map((book) => (
                          <li>
                            <Book bookId={book.id} onMoveBook={this.moveBook} />
                          </li>
                        ))}
                      </div>
                    )}
                  </ol>
                </div>
              </div>
            )}
          />
        ) : (
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  {shelves.map((shelf) => {
                    return (
                      <Shelf
                        onMoveBook={(book, shelf) => {
                          this.moveBook(book, shelf);
                        }}
                        allBooks={this.state.allBooks}
                        shelf={shelf}
                        shelvedBooks={this.state.allBooks}
                      />
                    );
                  })}
                  <div className="open-search">
                    <Link to="/search">
                      <button
                        onClick={() => this.setState({ showSearchPage: true })}
                      >
                        Add a book
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          />
        )}
      </div>
    );
  }
}

export default BooksApp;
