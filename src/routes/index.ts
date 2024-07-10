import { Router } from "express";
import addManyTrans from "../controllers/addManyTrans.js";
import readManyTrans from "../controllers/readManyTrans.js";
import updateManyTrans from "../controllers/updateManyTrans.js";
import deleteManyTrans from "../controllers/deleteManyTrans.js";
import readTrans from "../controllers/readTrans.js";
import updateTrans from "../controllers/updateTrans.js";
import deleteTrans from "../controllers/deleteTrans.js";

import getFormData from "../controllers/getFormData.js";

const router = Router();

router.post("/transactions/", addManyTrans);
router.get("/transactions/", readManyTrans);
router.put("/transactions/", updateManyTrans);
router.put("/transactions/", deleteManyTrans);
router.get("/transactions/:id", readTrans);
router.put("/transactions/:id", updateTrans);
router.delete("/transactions/:id", deleteTrans);

router.get("/forms", getFormData);

export default router;