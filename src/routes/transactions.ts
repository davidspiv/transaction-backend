import { Router } from 'express';
import addManyTrans from '../controllers/addManyTrans.js';
import readManyTrans from '../controllers/readManyTrans.js';
import updateManyTrans from '../controllers/updateManyTrans.js';
import deleteManyTrans from '../controllers/deleteManyTrans.js';
import readTrans from '../controllers/readTrans.js';
import updateTrans from '../controllers/updateTrans.js';
import deleteTrans from '../controllers/deleteTrans.js';

const router = Router();

router.post('/', addManyTrans);
router.get('/', readManyTrans);
router.put('/', updateManyTrans);
router.put('/', deleteManyTrans);
router.get('/:id', readTrans);
router.put('/:id', updateTrans);
router.delete('/:id', deleteTrans);

export default router;
