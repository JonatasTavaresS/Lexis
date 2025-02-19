import { Request, Response } from "express";
import { BookService } from "../services/bookService";

const bookService = new BookService();

export class BookController {
    static async createBook(req: Request, res: Response) {
        try {
            const {
                isbn,
                title,
                authors,
                publisher,
                publishedYear,
                language,
                genre,
                coverImageUrl,
            } = req.body;

            const book = await bookService.createBook(
                isbn,
                title,
                authors,
                publisher,
                publishedYear,
                language,
                genre,
                coverImageUrl
            );

            res.status(201).json(book);
        } catch (error: any) {
            res.status(500).json({ message: "Error creating book", error: error.message });
        }
    }

    static async getAllBooks(_: Request, res: Response) {
        try {
            const books = await bookService.getAllBooks();
            res.status(200).json(books);
        } catch (error: any) {
            res.status(500).json({ message: "Error retrieving books", error: error.message });
        }
    }

    static async getBook(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const book = await bookService.getBook(id);

            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error fetching book", error: error.message });
        }
    }

    static async updateBook(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const {
                isbn,
                title,
                authors,
                publisher,
                publishedYear,
                language,
                genre,
                coverImageUrl,
            } = req.body;

            const book = await bookService.updateBook(id, {
                isbn,
                title,
                authors,
                publisher,
                publishedYear,
                language,
                genre,
                coverImageUrl,
            });

            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error updating book", error: error.message });
        }
    }

    static async deleteBook(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await bookService.deleteBook(id);

            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error deleting book", error: error.message });
        }
    }
}
