
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';


/**
 * Book renders a book object and does some data validation
 * Book also uses a BookShelfChanger to render a dropdown list
 */
class Book extends Component {
    handleOnSelect = (value) => {
        this.props.handleOnSelect(this.props.book, value);
    }


    render() {
        const authors = this.props.book.authors;
        const shelf = this.props.book.shelf;
        let thumbnail = '';
        if (this.props.book.imageLinks !== undefined) {
            thumbnail = this.props.book.imageLinks.thumbnail;
        }

        return (
            <li className="books-grid li" key={this.props.book.id}>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{ width: 128, height: 188, backgroundImage: `url("${thumbnail}")` }}
                        />
                        <BookShelfChanger handleOnSelect={this.handleOnSelect} selectedItem={shelf === undefined ? 'none' : shelf} />
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">
                        {authors !== undefined ? authors.map(author => (
                            `${author} `
                        )) : ''}
                    </div>
                </div>
            </li>
        );
    }
}

Book.propTypes = {
    book: PropTypes.isRequired,
    handleOnSelect: PropTypes.func.isRequired,
};

export default Book;
