import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Shelf = props => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.shelf.title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {props.bookObj.books.filter(book => (
                    book.shelf === props.shelf.key
                )).map(book => (
                    <Book
                        book={book}
                        key={book.id}
                        handleOnSelect={props.handleOnSelect}
                    />
                ))}

            </ol>
        </div>
    </div>
);

Shelf.propTypes = {
    shelf: PropTypes.isRequired,
    bookObj: PropTypes.isRequired,
    handleOnSelect: PropTypes.func.isRequired,
};

export default Shelf;
