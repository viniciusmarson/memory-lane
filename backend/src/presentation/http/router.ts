import express from 'express';
import { upload } from '@data/database/images';
import { findMemoryFactory } from '@presentation/factories/find_memory_factory';
import { listMemoriesFactory } from '@presentation/factories/list_memories_factory';
import { deleteMemoryFactory } from '@presentation/factories/delete_memory_factory';
import { createMemoryFactory } from '@presentation/factories/create_memory_factory';
import { updateMemoryFactory } from '@presentation/factories/update_memory_factory';

const router = express.Router();

router.get('/memories', listMemoriesFactory().handle);
router.get('/memories/:id', findMemoryFactory().handle);
router.delete('/memories/:id', deleteMemoryFactory().handle);
router.post('/memories', upload.single('image'), createMemoryFactory().handle);
router.put('/memories/:id', updateMemoryFactory().handle);

export { router };
