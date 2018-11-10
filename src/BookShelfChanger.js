import React, { Component } from 'react';
import PropTypes from 'prop-types';


class BookShelfChanger extends Component {
    handleOnSelect = (event) => {
        this.props.handleOnSelect(event.target.value);
    }

    render() {
        return (
        <div className="book-shelf-changer">
            <select
                value={this.props.selectedItem}
                onChange={this.handleOnSelect}
            >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>);
    }
}

BookShelfChanger.propTypes = {
    selectedItem: PropTypes.string.isRequired,
    handleOnSelect: PropTypes.func.isRequired,
};

export default BookShelfChanger;
