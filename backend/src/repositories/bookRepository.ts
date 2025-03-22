import { Book } from "../models/Book";

export class BookRepository {

    async createBook(
        isbn: string,
        title: string,
        authors: string[],
        publisher: string,
        publishedYear: number,
        language: string,
        genre: string[],
        coverImageUrl: string
    ) {
        return await Book.create({
            isbn,
            title,
            authors,
            publisher,
            publishedYear,
            language,
            genre,
            coverImageUrl,
        });
    }

    async getAllBooks(offset: number, limit: number) {
        const { count, rows } = await Book.findAndCountAll({
            limit,
            offset,
        });

        return { books: rows, total: count };
    }

    async getBook(id: number) {
        return await Book.findByPk(id);
    }

    async updateBook(
        id: number,
        data: Partial<{
            isbn: string;
            title: string;
            authors: string[];
            publisher: string;
            publishedYear: number;
            language: string;
            genre: string[];
            coverImageUrl: string;
        }>
    ) {
        const book = await Book.findByPk(id);
        if (book) {
            return await book.update(data);
        }
        return null;
    }

    async deleteBook(id: number) {
        const book = await Book.findByPk(id);
        if (book) {
            return await book.destroy();
        }
        return null;
    }
}
