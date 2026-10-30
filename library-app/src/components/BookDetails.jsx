import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetAuthorsQuery,
  useGetBookByIdQuery,
} from "../services/libraryApi";

export default function BookDetails() {
  const { id } = useParams();
  const { data: book, isLoading, isError, error } = useGetBookByIdQuery(id);
  const { data: authors } = useGetAuthorsQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return <p className="message-card">Loading book...</p>;
  }

  if (isError) {
    return (
      <div>
        <Link className="back-link" to="/">
          ← Back to books
        </Link>
        <p className="message-card">
          {error?.status === 404
            ? "This book was not found."
            : "Could not load the book. Please try again."}
        </p>
      </div>
    );
  }

  const author = authors?.find((author) => author.id === book.authorId);

  return (
    <section>
      <Link className="back-link" to="/">
        ← Back to books
      </Link>

      <article className={`book-details book-card--tone-${book.id % 5}`}>
        <div className="book-cover" aria-hidden="true">
          <span className="book-cover-letter">{book.title.charAt(0)}</span>
        </div>

        <div className="book-details-body">
          <span
            className={`availability ${
              book.available
                ? "availability--available"
                : "availability--unavailable"
            }`}
          >
            {book.available ? "Available" : "Borrowed"}
          </span>
          <h1>{book.title}</h1>
          <p className="book-details-author">{author?.name ?? "Unknown"}</p>

          <dl className="book-details-facts">
            <div>
              <dt>Year</dt>
              <dd>{book.year}</dd>
            </div>
            <div>
              <dt>Genre</dt>
              <dd>{book.genre}</dd>
            </div>
          </dl>
        </div>
      </article>
    </section>
  );
}
