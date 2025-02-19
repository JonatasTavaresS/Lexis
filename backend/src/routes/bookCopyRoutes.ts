import { Router } from "express";
import { BookCopyController } from "../controllers/bookCopyController";

const router = Router();

router.post("/", BookCopyController.createBookCopy);
router.get("/", BookCopyController.getAllBookCopies);
router.get("/:id", BookCopyController.getBookCopy);
router.put("/:id", BookCopyController.updateBookCopy);
router.delete("/:id", BookCopyController.deleteBookCopy);
router.get("/book/:bookId", BookCopyController.getBookCopiesByBookId);

export default router;
