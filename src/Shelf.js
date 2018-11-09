import React, { Component } from 'react'
import Book from './Book'
const Shelf = (props) => {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelf.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.bookObj.books.filter((book) => (
                        book.shelf === props.shelf.key
                    )
                    ).map((book) => {
                     return  <Book book={book} key={book.id} handleOnSelect={props.handleOnSelect} />
                    })}

                </ol>
            </div>
        </div>
    )
}

export default Shelf