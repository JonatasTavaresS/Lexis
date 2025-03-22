import { Request, Response } from "express";
import { BookCopyService } from "../services/bookCopyService";

const bookCopyService = new BookCopyService();

export class BookCopyController {
    static async createBookCopy(req: Request, res: Response) {
        try {
            const {
                bookId,
                status,
                condition,
                acquisitionDate,
                location,
            } = req.body;

            const bookCopy = await bookCopyService.createBookCopy(
                bookId,
                status,
                condition,
                acquisitionDate,
                location
            );

            res.status(201).json(bookCopy);
        }
        catch (error: any) {
            res.status(500).json({ message: "Error creating book copy", error: error.message });
        }
    }

    static async getAllBookCopies(req: Request, res: Response) {
        try {
            let { page, limit } = req.query;

            const pageNumber = Math.max(parseInt(page as string) || 1, 1);
            const limitNumber = Math.min(Math.max(parseInt(limit as string) || 10, 1), 100);
            const offset = (pageNumber - 1) * limitNumber;

            const { bookCopies, total } = await bookCopyService.getAllBookCopies(offset, limitNumber);
            res.status(200).json({ bookCopies, total, page: pageNumber, limit: limitNumber });
        }
        catch (error: any) {
            res.status(500).json({ message: "Error retrieving book copies", error: error.message });
        }
    }

    static async getBookCopy(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const bookCopy = await bookCopyService.getBookCopy(id);

            if (bookCopy) {
                res.status(200).json(bookCopy);
            } else {
                res.status(404).json({ message: "Book copy not found" });
            }
        }
        catch (error: any) {
            res.status(500).json({ message: "Error fetching book copy", error: error.message });
        }
    }

    static async updateBookCopy(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const {
                bookId,
                status,
                condition,
                acquisitionDate,
                location,
            } = req.body;

            const updatedBookCopy = await bookCopyService.updateBookCopy(id, {
                bookId,
                status,
                condition,
                acquisitionDate,
                location,
            });

            if (updatedBookCopy) {
                res.status(200).json(updatedBookCopy);
            } else {
                res.status(404).json({ message: "Book copy not found" });
            }
        }
        catch (error: any) {
            res.status(500).json({ message: "Error updating book copy", error: error.message });
        }
    }

    static async deleteBookCopy(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deletedBookCopy = await bookCopyService.deleteBookCopy(id);

            if (deletedBookCopy) {
                res.status(204).json(deletedBookCopy);
            } else {
                res.status(404).json({ message: "Book copy not found" });
            }
        }
        catch (error: any) {
            res.status(500).json({ message: "Error deleting book copy", error: error.message });
        }
    }

    static async getBookCopiesByBookId(req: Request, res: Response) {
        try {
            const bookId = Number(req.params.bookId);
            const bookCopies = await bookCopyService.getBookCopiesByBookId(bookId);

            res.status(200).json(bookCopies);
        }
        catch (error: any) {
            res.status(500).json({ message: "Error fetching book copies", error: error.message });
        }
    }
}
