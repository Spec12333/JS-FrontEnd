import {
  BOOKS_PER_PAGE,
  useGetBooksQuery,
  useGetAuthorsQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
} from "../services/libraryApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddBook from "./AddBook";

export default function Books({ page, setPage }) {
  const { data, isLoading, isError, error } = useGetBooksQuery(page);
  const { data: authors } = useGetAuthorsQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [selectedBook, setSelectedBook] = useState(null);
  if (isLoading) {
    return <p className="message-card">Loading books...</p>;
  }

  if (isError) {
    return <p className="message-card">{error?.status}</p>;
  }

  const totalPages = Math.max(1, Math.ceil(data.total / BOOKS_PER_PAGE));

  return (
    <section aria-labelledby="collection-title">
      <div className="collection-intro">
        <span className="section-eyebrow">Your collection</span>
        <h1 id="collection-title">Bookshelf</h1>
        <p>Keep track of the stories worth coming back to.</p>
      </div>

      <AddBook
        bookToEdit={selectedBook}
        onCancel={() => setSelectedBook(null)}
      />
      <div className="shelf">
        <div className="shelf-header">
          <h2>All books</h2>
          <p>Browse your library collection</p>
        </div>

        <div className="books-grid">
          {data.books.map((book) => (
            <div
              className={`book-card book-card--tone-${book.id % 5}`}
              key={book.id}
            >
              <div className="book-cover" aria-hidden="true">
                <span className="book-cover-letter">
                  {book.title.charAt(0)}
                </span>
              </div>
              <span
                className={`availability ${
                  book.available
                    ? "availability--available"
                    : "availability--unavailable"
                }`}
              >
                {book.available ? "Available" : "Borrowed"}
              </span>

              <div className="book-body">
                <h3 className="book-title">
                  <Link className="book-link" to={`/books/${book.id}`}>
                    {book.title}
                  </Link>
                </h3>
                <p className="book-author">
                  {authors?.find((author) => author.id === book.authorId)
                    ?.name ?? "Unknown"}
                </p>
                <div className="book-meta">
                  <span>{book.year}</span>
                  <span>{book.genre}</span>
                </div>

                <div className="book-actions">
                  <button
                    className="toggle-button"
                    type="button"
                    onClick={() => {
                      updateBook({
                        id: book.id,
                        newBody: { available: !book.available },
                      });
                    }}
                  >
                    {book.available ? "Mark as borrowed" : "Mark as available"}
                  </button>
                  <button
                    className="edit-button"
                    type="button"
                    onClick={() => setSelectedBook(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => {
                      if (!window.confirm(`Delete "${book.title}"?`)) {
                        return;
                      }
                      deleteBook(book.id);
                      if (data.books.length === 1 && page > 1) {
                        setPage(page - 1);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
