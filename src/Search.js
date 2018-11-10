import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'
class Search extends Component {
    state = {
        textInput: '',
        searchResults: []
    }

    performSearch = (value) => {
        const results = (BooksAPI.search(value));

        results.then((output) => {
            if (output["error"] === undefined) {
                this.setState(() => ({
                    searchResults: output
                }))
            } else {
                console.log(output)
                this.setState(() => ({
                    searchResults: []
                }))
            }


        }
        )
    }

    handleTextChanged = (event) => {
        const { value } = event.target
        this.setState(() => ({
            textInput: value
        }))
        if (value !== "") {
            this.performSearch(value)
        }
    }
    render() {
        const { textInput } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" />
                    <div className="search-books-input-wrapper">
                        {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
                        <input type="text"
                            value={textInput}
                            onChange={this.handleTextChanged}
                            placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchResults.map(book =>
                            <Book
                                key={book.id}
                                book={book}
                                handleOnSelect={this.props.handleOnSelect}
                            />)}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search