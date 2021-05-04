import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Book from './Book'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      shelvedBooks: {
        currentlyReading: [],
        wantToRead: [],
        read: [],
      },
      showSearchPage: false,
      query: "",
      shelves: ["Currently Reading", "Want To Read", "Read"],
      searchedBooks: [],
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
      query: query,
    }));

    BooksAPI.search(query).then((searchedBooks) => {
      if (
        searchedBooks === undefined ||
        (searchedBooks.items && searchedBooks.items.length === 0)
      ) {
        this.setState(() => ({
          searchedBooks: [],
        }));
      } else {
        this.setState(() => ({
          searchedBooks,
        }));
      }
    });
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((shelvedBooks) => {
      BooksAPI.getAll().then((allBooks) => {
        this.setState(() => ({
          allBooks,
        }));
      });
    });
  }

  getBook = (book) => {
    const shelvedBook = this.state.allBooks.find(({ id }) => id === book.id);
    if (shelvedBook !== undefined) return shelvedBook;
    else return book;
  }

  render() {
    const { query, searchedBooks } = this.state;
    const shelves = Object.getOwnPropertyNames(this.state.shelvedBooks);
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Route
            exact
            path="/search"
            render={() => (
              <div className="search-books">
                <div className="search-books-bar">
                  <Link to="/">
                    <button
                      className="close-search"
                      onClick={() => this.setState({ showSearchPage: false })}
                    >
                      Close
                    </button>
                  </Link>
                  <div className="search-allBooks-input-wrapper">
                    <input
                      type="text"
                      placeholder="Search by title or author"
                      value={query}
                      onChange={(event) => this.updateQuery(event.target.value)}
                    />
                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid">
                    {searchedBooks.map((book) => (
                      <li key={book.id}>
                        <Book
                          book={this.getBook(book)}
                          onMoveBook={this.moveBook}
                        />
                      </li>
                    ))}
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
                      <div key={shelf}>
                        <Shelf
                          onMoveBook={(book, shelf) => {
                            this.moveBook(book, shelf);
                          }}
                          allBooks={this.state.allBooks}
                          shelf={shelf}
                        />
                      </div>
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

export default BooksApp
