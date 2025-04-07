"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookCard from "../components/Book/BookCard";
import FilterSidebar from "../components/Book/FilterSidebar";
import styles from "../styles/catalog.module.css";

interface Book {
  id: number;
  title: string;
  authors: string[];
  coverImageUrl: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<{ books: Book[] } | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`);
        if (!response.ok) throw new Error("Erro ao buscar livros");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books?.books?.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  ) || [];

  return (
    <div>
      <div className={styles.container}>
        <FilterSidebar />
        <div className={styles.content}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Pesquisar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className={styles.bookGrid}>
            {/* Cartão para cadastrar novo livro */}
            <div className={styles.newBookCard} onClick={() => router.push("/books/create")}>
              <span className={styles.plus}>+</span>
              <p>Cadastrar Novo Livro</p>
            </div>

            {/* Cartão de carregamento */}
            {loading && (
              <div className={styles.loadingCard}>
                <div className={styles.spinner}></div>
                <p>Carregando livros...</p>
              </div>
            )}

            {/* Renderizando os livros filtrados */}
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
