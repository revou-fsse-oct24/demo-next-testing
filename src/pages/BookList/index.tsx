// src/components/BookList.jsx
export default function BookList() {
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: 1925,
    },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 3, title: "1984", author: "George Orwell", year: 1949 },
  ];

  return (
    <div className="book-list">
      <h2>Classic Books</h2>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p className="author">By: {book.author}</p>
            <p className="year">Published: {book.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
