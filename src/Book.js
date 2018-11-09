import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger';
class Book extends Component {
    handleOnSelect = (value) => {
        this.props.handleOnSelect(this.props.book,value)
    }
    render() {
        return (
            <li key={this.props.book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128, height: 188, backgroundImage: `url(${this.props.book.imageLinks["thumbnail"]})`
                        }}></div>
                        <BookShelfChanger handleOnSelect={this.handleOnSelect} selectedItem={this.props.book.shelf} />
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.book.authors.map((author) => (
                        `${author} `
                    ))}</div>
                </div>
            </li>
        )
    }
}

export default Book