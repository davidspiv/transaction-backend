import { Router } from 'express';
import addPosts from '../controllers/addPosts.js';
import getPosts from '../controllers/getPosts.js';
import updatePosts from '../controllers/updatePosts.js';
import deletePosts from '../controllers/deletePosts.js';
import getPost from '../controllers/getPost.js';
import updatePost from '../controllers/updatePost.js';
import deletePost from '../controllers/deletePost.js';

const router = Router();

router.post('/', addPosts);
router.get('/', getPosts);
router.put('/', updatePosts);
router.put('/', deletePosts);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
