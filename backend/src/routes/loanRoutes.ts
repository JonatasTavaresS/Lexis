import { Router } from "express";
import { LoanController } from "../controllers/loanController";

const router = Router();

router.post("/", LoanController.createLoan);
router.get("/", LoanController.getAllLoans);
router.get("/:id", LoanController.getLoan);
router.put("/:id", LoanController.updateLoan);
router.delete("/:id", LoanController.deleteLoan);
router.get("/user/:userId", LoanController.getLoansByUserId);
router.get("/book/:bookCopyId", LoanController.getLoansByBookCopyId);
router.put("/status/:status", LoanController.getLoansByStatus);

export default router;
