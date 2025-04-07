import styles from "../../styles/components.module.css";

interface Book {
  id: number;
  title: string;
  authors: string[];
  coverImageUrl: string;
}

export default function BookCard({ book }: { book: Book }) {
  const imageSrc = book.coverImageUrl?.startsWith("data:image")
    ? book.coverImageUrl
    : `data:image/png;base64,${book.coverImageUrl}`;

  return (
    <div className={styles.bookCard}>
      <img src={imageSrc} alt={book.title} className={styles.bookImage} />
      <h3><strong>{book.title}</strong></h3>
      <p>{book.authors.length > 0 ? book.authors[0] : "Autor desconhecido"}</p>
    </div>
  );
}
