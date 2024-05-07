import express from 'express';
import * as resource from '../controller/resourceController'
import { authenticateToken } from '../middleware/authentication';

const router = express.Router();

router.get('/', authenticateToken, resource.getResources);
router.get('/:id', authenticateToken, resource.getResourceById);
router.post('/', authenticateToken, resource.createResource);
router.put('/:id', authenticateToken, resource.updateResource);
router.delete('/:id', authenticateToken, resource.deleteResource);

export default router;
