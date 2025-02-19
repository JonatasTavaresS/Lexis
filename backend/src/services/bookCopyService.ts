import { BookCopyCondition, BookCopyStatus } from "../models/BookCopy";
import { BookCopyRepository } from "../repositories/bookCopyRepository";

const bookCopyRepo = new BookCopyRepository();

export class BookCopyService {
    async createBookCopy(
        bookId: number,
        status: BookCopyStatus,
        condition: BookCopyCondition,
        acquisitionDate: Date,
        location: string
    ) {
        return await bookCopyRepo.createBookCopy(bookId, status, condition, acquisitionDate, location);
    }

    async getAllBookCopies() {
        return await bookCopyRepo.getAllBookCopies();
    }

    async getBookCopy(id: number) {
        return await bookCopyRepo.getBookCopy(id);
    }

    async updateBookCopy(
        id: number,
        data: Partial<{
            bookId: number;
            status: BookCopyStatus;
            condition: BookCopyCondition;
            acquisitionDate: Date;
            location: string;
        }>
    ) {
        return await bookCopyRepo.updateBookCopy(id, data);
    }

    async deleteBookCopy(id: number) {
        return await bookCopyRepo.deleteBookCopy(id);
    }

    async getBookCopiesByBookId(bookId: number) {
        return await bookCopyRepo.getBookCopiesByBookId(bookId);
    }
}
