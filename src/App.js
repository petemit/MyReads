import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Search from './Search';
import Shelf from './Shelf';

const bookshelves = [
  {
    title: 'Currently Reading',
    key: 'currentlyReading',
  },
  {
    title: 'Want to Read',
    key: 'wantToRead',
  },
  {
    title: 'Read',
    key: 'read',
  }];

class BooksApp extends React.Component {
  state = {
    bookObj: {
      books: [],
    },
  }

  componentDidMount() {
    this.reFetchData();
  }

  reFetchData = () => {
    BooksAPI.getAll().then((books) => {
      if (books !== undefined) {
        this.setState({
          bookObj: { books },
        });
      }
    });
  }

  setShelf = (book) => {
    const cachedBook = this.state.bookObj.books.find(foundBook => foundBook.id === book.id);
    if (cachedBook !== undefined) {
      // eslint-disable-next-line no-param-reassign
      book.shelf = cachedBook.shelf;
    }
  }

  handleOnSelect = (book, value) => {
    const result = BooksAPI.update(book, value);

    result.then((res) => {
      if (res !== undefined) {
        // If the book result is indeed in the shelf we set it in
        const filtered = this.state.bookObj.books.filter(
          filteredBook => book.id !== filteredBook.id,
        );

        if (value === 'none') {
          this.setState(() => ({
            bookObj: {
              books: filtered,
            },
          }));
        } else if (res[value] !== undefined && res[value].find(val => (
          val === book.id)) !== undefined) {
          // eslint-disable-next-line no-param-reassign
          book.shelf = value;
          this.setState(() => ({
            bookObj: {
              books: filtered.concat([book]),
            },
          }));
        }
      }
    });
  }

  render() {
    return (
      <div>
        <div className="app" />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {bookshelves.map(shelf => (
                    <Shelf
                      key={shelf.key}
                      handleOnSelect={this.handleOnSelect}
                      shelf={shelf}
                      bookObj={this.state.bookObj}
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>

          )}
        />

        <Route
          path="/search"
          render={() => (
            <Search
              handleOnSelect={this.handleOnSelect}
              setShelf={this.setShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
