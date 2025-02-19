import { Loan, LoanStatus } from '../models/Loan';

export class LoanRepository {

    async createLoan(
        bookCopyId: number,
        userId: number,
        loanDate: Date,
        returnDate: Date,
        status: LoanStatus
    ) {
        return await Loan.create({
            bookCopyId,
            userId,
            loanDate,
            returnDate,
            status,
        });
    }

    async getAllLoans() {
        return await Loan.findAll();
    }

    async getLoan(id: number) {
        return await Loan.findByPk(id);
    }

    async updateLoan(
        id: number,
        data: Partial<{
            bookCopyId: number;
            userId: number;
            loanDate: Date;
            returnDate: Date;
            status: LoanStatus;
        }>
    ) {
        const loan = await Loan.findByPk(id);
        if (loan) {
            return await loan.update(data);
        }
        return null;
    }

    async deleteLoan(id: number) {
        const loan = await Loan.findByPk(id);
        if (loan) {
            return await loan.destroy();
        }
        return null;
    }

    async getLoansByUserId(userId: number) {
        return await Loan.findAll({
            where: {
                userId,
            },
        });
    }

    async getLoansByBookCopyId(bookCopyId: number) {
        return await Loan.findAll({
            where: {
                bookCopyId,
            },
        });
    }

    async getLoansByStatus(status: string) {
        return await Loan.findAll({
            where: {
                status,
            },
        });
    }
}
