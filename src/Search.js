import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {
    state = {
        textInput: '',
        searchResults: [],
    }

    clearResults = () => {
        this.setState(() => ({
            searchResults: [],
        }));
    }

    performSearch = (value) => {
        const results = (BooksAPI.search(value));

        results.then((output) => {
            if (output.error === undefined) {
                this.setState(() => ({
                    searchResults: output,
                }));
            } else {
                this.clearResults();
            }
        });
    }

    handleTextChanged = (event) => {
        const { value } = event.target;
        this.setState(() => ({
            textInput: value,
        }));
        // eslint-disable-next-line no-unused-expressions
        value !== '' ? this.performSearch(value) : this.clearResults();
    }

    render() {
        const { textInput } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" />
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            value={textInput}
                            onChange={this.handleTextChanged}
                            placeholder="Search by title or author"
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.textInput !== '' && this.state.searchResults.map((book) => {
                            this.props.setShelf(book);
                            return (
                                <Book
                                    key={book.id}
                                    book={book}
                                    handleOnSelect={this.props.handleOnSelect}
                                />
                            );
                        })}
                    </ol>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    handleOnSelect: PropTypes.func.isRequired,
    setShelf: PropTypes.func.isRequired,
};

export default Search;
