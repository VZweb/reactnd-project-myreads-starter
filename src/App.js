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
        currentlyReadingBooks: [],
        wantToReadBooks: [],
        readBooks: [],
        noneBooks: [],
      },
      showSearchPage: false,
      query: "",
      shelves: ["Currently Reading", "Want To Read", "Read", "None"],
    };
  }
  // state = {
  //   /**
  //    * TODO: Instead of using this state variable to keep track of which page
  //    * we're on, use the URL in the browser's address bar. This will ensure that
  //    * users can use the browser's back and forward buttons to navigate between
  //    * pages, as well as provide a good URL they can bookmark and share.
  //    */
  //   allBooks: [],
  //   shelvedBooks: {
  //     currentlyReadingBooks: [],
  //     wantToReadBooks: [],
  //     readBooks: [],
  //     noneBooks: [],
  //   },
  //   showSearchPage: false,
  //   query: "",
  //   shelves: ["Currently Reading", "Want To Read", "Read", "None"]
  // };

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
    switch (shelf) {
      case "currentlyReading":
        this.setState({
          shelvedBooks: {
            ...this.state.shelvedBooks,
            currentlyReadingBooks: this.state.shelvedBooks.currentlyReadingBooks.concat(
              [book]
            ),
          },
        });
        break;
      case "wantToRead":
        this.setState({
          shelvedBooks: {
            ...this.state.shelvedBooks,
            wantToReadBooks: this.state.shelvedBooks.wantToReadBooks.concat([
              book,
            ]),
          },
        });
        break;
      case "read":
        this.setState({
          shelvedBooks: {
            ...this.state.shelvedBooks,
            readBooks: this.state.shelvedBooks.readBooks.concat([book]),
          },
        });
        break;
      case "none":
        this.setState({
          shelvedBooks: {
            ...this.state.shelvedBooks,
            noneBooks: this.state.shelvedBooks.noneBooks.concat([book]),
          },
        });
        break;
    }
  };

  render() {
    const { query, allBooks } = this.state;

    const showingBooks =
      query === "" ? allBooks : allBooks.filter((c) => c.title.includes(query));
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Route exact path="/search"
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
                            <Book book={book} onMoveBook={this.moveBook}  />
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
          <Route exact path="/" render={() => (
              <div>
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  {this.state.shelves.map((shelf) => {
                    return (
                      <Shelf
                        onMoveBook={(book, shelf) => {
                          this.moveBook(book, shelf);
                        }}
                        allBooks={this.state.allBooks}
                        shelf={shelf}
                        shelvedBooks={this.state.shelvedBooks}
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
