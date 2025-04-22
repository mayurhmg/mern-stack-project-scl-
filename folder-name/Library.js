import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import '../../styles/Library.css'; // Import CSS

const Library = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(' http://localhost:3000/api/v1/library/getall');
      setBooks(response.data.books || []); // Default to empty array if no books
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books. Please try again.');
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!newBook.title.trim() || !newBook.author.trim()) {
      setError('Please enter both title and author.');
      return;
    }

    try {
      const response = await axios.post(' http://localhost:3000/api/v1/library', newBook);
      setBooks([...books, response.data.book]); // Assuming API returns the new book
      setNewBook({ title: '', author: '' }); // Reset form
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Failed to add book. Please try again.');
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(` http://localhost:3000/api/v1/library/${id}`);
      setBooks(books.filter((book) => book.id !== id)); // Remove deleted book from state
      setError(null);
    } catch (error) {
      console.error('Error deleting book:', error);
      setError('Failed to delete book. Please try again.');
    }
  };

  return (
    <div className="library-container">
      <Sidebar />
      <div className="library-content">
        <h2>Library</h2>

        {/* Form to add new book */}
        <form className="add-book-form" onSubmit={handleAddBook}>
          <input
            type="text"
            placeholder="Book Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="add-book-input"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="add-book-input"
          />
          <button type="submit" className="add-book-button">Add Book</button>
        </form>

        {/* Error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Book list */}
        <ul className="book-list">
          {books.length === 0 ? (
            <li className="no-books">No books available.</li>
          ) : (
            books.map((book) => (
              <li key={book.id} className="book-item">
                <span>{book.title} by {book.author}</span>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  ❌
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Library;