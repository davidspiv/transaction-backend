import type { Request, Response, NextFunction } from "express";
import readOne from "../../db/transaction/readOne.js";

//@route GET /api/transactions/:id
export default (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const trans = readOne(id);

  if (!trans) {
    const error = new Error(`A transaction with id of ${id} was not found`);
    res.status(404);
    return next(error);
  }

  res.status(200).json({ transactions: trans });
};