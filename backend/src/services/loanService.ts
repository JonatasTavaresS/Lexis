import { LoanStatus } from "../models/Loan";
import { LoanRepository } from "../repositories/loanRepository";

const loanRepo = new LoanRepository();

export class LoanService {
    async createLoan(bookCopyId: number, userId: number, loanDate: Date, returnDate: Date, status: LoanStatus) {
        return await loanRepo.createLoan(bookCopyId, userId, loanDate, returnDate, status);
    }

    async getAllLoans() {
        return await loanRepo.getAllLoans();
    }

    async getLoan(id: number) {
        return await loanRepo.getLoan(id);
    }

    async updateLoan(id: number, data: Partial<{ bookCopyId: number; userId: number; loanDate: Date; returnDate: Date; status: LoanStatus; }>) {
        return await loanRepo.updateLoan(id, data);
    }

    async deleteLoan(id: number) {
        return await loanRepo.deleteLoan(id);
    }

    async getLoansByUserId(userId: number) {
        return await loanRepo.getLoansByUserId(userId);
    }

    async getLoansByBookCopyId(bookCopyId: number) {
        return await loanRepo.getLoansByBookCopyId(bookCopyId);
    }

    async getLoansByStatus(status: LoanStatus) {
        return await loanRepo.getLoansByStatus(status);
    }
}
