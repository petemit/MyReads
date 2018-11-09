import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Router from 'react-router-dom'
import Book from './Book'
import Search from './Search'
import Shelf from './Shelf';

const bookshelves = [
  {
    title: "Currently Reading",
    key: "currentlyReading"
  },
  {
    title: "Want to Read",
    key: "wantToRead"
  },
  {
    title: "Read",
    key: "read"
  }]

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    bookObj: {
      books: []
    }
  }

  reFetchData = () => {
    BooksAPI.getAll().then((books) => {
      if (books !== undefined) {
        this.setState({
          bookObj: { books }
        })
      }
    }
    )
  }

  componentDidMount() {
    this.reFetchData()
  }

  handleOnSelect = (book, value) => {
    const result = BooksAPI.update(book, value);

    result.then((res) => {
      /*This does not seem as efficient to me to refetch everything.  However, update does not give 
      you the same object...  I'd have to iterate through each shelf and touch every book
      */

      this.reFetchData();
    })
  }

  render() {
    return (
      <div className="app" >
        {
          this.state.showSearchPage ? (
            <Search />

          ) : (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {bookshelves.map(shelf => (
                      <Shelf key={shelf.key} handleOnSelect={this.handleOnSelect} shelf={shelf} bookObj={this.state.bookObj}></Shelf>
                    ))}
                  </div>
                </div>
                <div className="open-search">
                  <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
              </div>
            )
        }
      </div>
    )
  }
}

export default BooksApp
