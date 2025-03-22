import { BookRepository } from "../repositories/bookRepository";

const bookRepo = new BookRepository();

export class BookService {
    async createBook(isbn: string, title: string, authors: string[], publisher: string, publishedYear: number, language: string, genre: string[], coverImageUrl: string) {
        return await bookRepo.createBook(isbn, title, authors, publisher, publishedYear, language, genre, coverImageUrl);
    }

    async getAllBooks(offset: number, limit: number) {
        return await bookRepo.getAllBooks(offset, limit);
    }

    async getBook(id: number) {
        return await bookRepo.getBook(id);
    }

    async updateBook(id: number, data: Partial<{ isbn: string; title: string; authors: string[]; publisher: string; publishedYear: number; language: string; genre: string[]; coverImageUrl: string; }>) {
        return await bookRepo.updateBook(id, data);
    }

    async deleteBook(id: number) {
        return await bookRepo.deleteBook(id);
    }
}
