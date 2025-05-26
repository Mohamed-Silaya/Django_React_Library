import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [updateTitle, setUpdateTitle] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };

  const addBook = async () => {
    const bookData = {
      title: title,
      release_year: releaseYear,
    };

    // Send data using POST method
    // Specify that the data being sent is JSON
    // Set the header to Content-Type: application/json
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      // If you want the response to appear immediately without waiting for the database
      const data = await response.json();
      setBooks((prevBooks) => [...prevBooks, data]);
    } catch (error) {
      console.log("Error adding book:", error);
    }
  };

  const updateBook = async (pk, release_year) => {
    const bookData = {
      title: updateTitle,
      release_year: release_year,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      const data = await response.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === pk ? data : book
        )
      );
    } catch (error) {
      console.log("Error updating book:", error);
    }
  };

const deleteBook = async (pk) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
      method: "DELETE",
    });
    if (response.ok) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== pk));
    } else {
      console.log("Failed to delete book:", response.status);
    }
  } catch (error) {
    console.log("Error deleting book:", error);
  }
};

  return (
    <>
      <h1>Book website</h1>

      <div>
        <input
          type="text"
          placeholder="Search for book Title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release year..."
          onChange={(e) => setReleaseYear(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>
      {books.map((book) => (
        <div key={book.id}>
          <p>Title :{book.title}</p>
          <p>release Year: {book.release_year}</p>
          <input
            type="text"
            placeholder="Update book title..."
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
          <button onClick={()=> updateBook(book.id,book.release_year )}>Update</button>
          <button onClick={()=>deleteBook(book.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default App;
