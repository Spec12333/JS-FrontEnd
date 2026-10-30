import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useGetAuthorsQuery,
  useAddBookMutation,
  useUpdateBookMutation,
} from "../services/libraryApi";

export default function AddBook({ bookToEdit, onCancel }) {
  const [addBook, { isLoading: isAdding, isError: addError }] =
    useAddBookMutation();
  const [updateBook, { isLoading: isUpdating, isError: updateError }] =
    useUpdateBookMutation();

  const {
    data: authors,
    isLoading: isLoadingAuthors,
    isError: isAuthorsError,
  } = useGetAuthorsQuery();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (bookToEdit) {
      reset({
        title: bookToEdit.title,
        authorId: String(bookToEdit.authorId),
        year: bookToEdit.year,
        genre: bookToEdit.genre,
      });
    } else {
      reset({
        title: "",
        authorId: "",
        year: "",
        genre: "",
      });
    }
  }, [bookToEdit, reset]);

  const handleSave = async (formData) => {
    const bookData = {
      ...formData,
      authorId: Number(formData.authorId),
      year: Number(formData.year),
    };

    const result = bookToEdit
      ? await updateBook({
          id: bookToEdit.id,
          newBody: bookData,
        })
      : await addBook({
          ...bookData,
          available: true,
        });

    if (!("error" in result)) {
      reset();
      onCancel?.();
    }
  };

  return (
    <section className="add-book-section" aria-labelledby="add-book-title">
      <div className="books-card add-book-card">
        <div className="books-card-header">
          <div className="books-card-heading">
            <h2 id="add-book-title">
              {bookToEdit ? "Edit book" : "Add a book"}
            </h2>
            <p>
              {bookToEdit
                ? "Update the details in your collection"
                : "Add another story to your collection"}
            </p>
          </div>
          <span className="collection-tag">
            {bookToEdit ? "Editing" : "New entry"}
          </span>
        </div>

        <form className="add-book-form" onSubmit={handleSubmit(handleSave)}>
          <div className="form-field">
            <label htmlFor="book-title">Book title</label>
            <input
              id="book-title"
              type="text"
              placeholder="e.g. Anna Karenina"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "book-title-error" : undefined}
              {...register("title", {
                required: "Please enter the book title",
              })}
            />
            {errors.title && (
              <span className="field-error" id="book-title-error" role="alert">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="book-author">Author</label>
            <select
              id="book-author"
              defaultValue=""
              disabled={isLoadingAuthors || !authors?.length}
              aria-invalid={Boolean(errors.authorId)}
              aria-describedby={
                errors.authorId ? "book-author-error" : undefined
              }
              {...register("authorId", {
                required: "Please select the author",
              })}
            >
              <option value="" disabled>
                {isLoadingAuthors ? "Loading authors..." : "Select an author"}
              </option>
              {(authors ?? []).map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
            {errors.authorId && (
              <span className="field-error" id="book-author-error" role="alert">
                {errors.authorId.message}
              </span>
            )}
            {isAuthorsError && (
              <span className="field-error" role="alert">
                Could not load authors. Please try again.
              </span>
            )}
            {!isLoadingAuthors && !isAuthorsError && !authors?.length && (
              <span className="field-error" role="alert">
                Add an author before adding a book.
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="book-year">Year</label>
            <input
              id="book-year"
              type="number"
              step="1"
              placeholder="e.g. 1886"
              aria-invalid={Boolean(errors.year)}
              aria-describedby={errors.year ? "book-year-error" : undefined}
              {...register("year", {
                required: "Please enter the book year",
                valueAsNumber: true,
                validate: (year) =>
                  (Number.isFinite(year) && Number.isInteger(year)) ||
                  "Please enter a valid year",
              })}
            />
            {errors.year && (
              <span className="field-error" id="book-year-error" role="alert">
                {errors.year.message}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="book-genre">Genre</label>
            <input
              id="book-genre"
              type="text"
              placeholder="e.g. Historical novel"
              aria-invalid={Boolean(errors.genre)}
              aria-describedby={errors.genre ? "book-genre-error" : undefined}
              {...register("genre", {
                required: "Please enter the genre",
              })}
            />
            {errors.genre && (
              <span className="field-error" id="book-genre-error" role="alert">
                {errors.genre.message}
              </span>
            )}
          </div>

          {(addError || updateError) && (
            <p className="form-submit-error" role="alert">
              Could not {bookToEdit ? "update" : "add"} the book. Please try
              again.
            </p>
          )}

          <div className="form-actions">
            {bookToEdit && (
              <button
                className="cancel-button"
                type="button"
                onClick={onCancel}
                disabled={isAdding || isUpdating}
              >
                Cancel
              </button>
            )}
            <button
              className="add-book-button"
              type="submit"
              disabled={
                isAdding ||
                isUpdating ||
                isLoadingAuthors ||
                !authors?.length
              }
            >
              {isAdding || isUpdating
                ? bookToEdit
                  ? "Saving..."
                  : "Adding..."
                : bookToEdit
                  ? "Save changes"
                  : "Add book"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
