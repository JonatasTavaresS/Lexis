import { BookCopy, BookCopyCondition, BookCopyStatus } from "../models/BookCopy";

export class BookCopyRepository {

    async createBookCopy(
        bookId: number,
        status: BookCopyStatus,
        condition: BookCopyCondition,
        acquisitionDate: Date,
        location: string
    ) {
        return await BookCopy.create({
            bookId,
            status,
            condition,
            acquisitionDate,
            location,
        });
    }

    async getAllBookCopies(offset: number, limit: number) {
        const { count, rows } = await BookCopy.findAndCountAll({
            limit,
            offset,
        });

        return { bookCopies: rows, total: count };
    }

    async getBookCopy(id: number) {
        return await BookCopy.findByPk(id);
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
        const bookCopy = await BookCopy.findByPk(id);
        if (bookCopy) {
            return await bookCopy.update(data);
        }
        return null;
    }

    async deleteBookCopy(id: number) {
        const bookCopy = await BookCopy.findByPk(id);
        if (bookCopy) {
            return await bookCopy.destroy();
        }
        return null;
    }

    async getBookCopiesByBookId(bookId: number) {
        return await BookCopy.findAll({ where: { bookId } });
    }
}
