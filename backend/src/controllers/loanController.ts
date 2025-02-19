import { Request, Response } from "express";
import { LoanStatus } from "../models/Loan";
import { LoanService } from "../services/loanService";

const loanService = new LoanService();

export class LoanController {

    static async createLoan(req: Request, res: Response) {
        try {
            const { bookCopyId, userId, loanDate, returnDate, status } = req.body;

            const loan = await loanService.createLoan(bookCopyId, userId, loanDate, returnDate, status);
            res.status(201).json(loan);
        } catch (error: any) {
            res.status(500).json({ message: "Error creating loan", error: error.message });
        }
    }

    static async getAllLoans(_: Request, res: Response) {
        try {
            const loans = await loanService.getAllLoans();
            res.status(200).json(loans);
        } catch (error: any) {
            res.status(500).json({ message: "Error retrieving loans", error: error.message });
        }
    }

    static async getLoan(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const loan = await loanService.getLoan(id);

            if (loan) {
                res.status(200).json(loan);
            } else {
                res.status(404).json({ message: "Loan not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: "Error fetching loan", error: error.message });
        }
    }

    static async updateLoan(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = req.body;

            const loan = await loanService.updateLoan(id, data);
            res.status(200).json(loan);
        } catch (error: any) {
            res.status(500).json({ message: "Error updating loan", error: error.message });
        }
    }

    static async deleteLoan(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await loanService.deleteLoan(id);
            res.status(204).end();
        } catch (error: any) {
            res.status(500).json({ message: "Error deleting loan", error: error.message });
        }
    }

    static async getLoansByUserId(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId);
            const loans = await loanService.getLoansByUserId(userId);
            res.status(200).json(loans
            );
        } catch (error: any) {
            res.status(500).json({ message: "Error fetching loans", error: error.message });
        }
    }

    static async getLoansByBookCopyId(req: Request, res: Response) {
        try {
            const bookCopyId = Number(req.params.bookCopyId);
            const loans = await loanService.getLoansByBookCopyId(bookCopyId);
            res.status(200).json(loans);
        } catch (error: any) {
            res.status(500).json({ message: "Error fetching loans", error: error.message });
        }
    }

    static async getLoansByStatus(req: Request, res: Response) {
        try {
            const status = req.params.status as LoanStatus;
            const loans = await loanService.getLoansByStatus(status);
            res.status(200).json(loans);
        } catch (error: any) {
            res.status(500).json({ message: "Error fetching loans", error: error.message });
        }
    }
}
