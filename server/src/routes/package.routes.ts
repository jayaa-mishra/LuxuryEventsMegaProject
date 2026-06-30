import express from 'express';
import { getPackages, getPackageById, createPackage, updatePackage, deletePackage } from '../controllers/package.controller';
import { protect, admin } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { createPackageValidator, updatePackageValidator } from '../middlewares/validators';

const router = express.Router();

/**
 * @swagger
 * /packages:
 *   get:
 *     summary: Returns the list of all active packages
 *     tags: [Packages]
 *     responses:
 *       200:
 *         description: The list of packages
 */
router.route('/')
  .get(getPackages)
  .post(protect, admin, createPackageValidator, validateRequest, createPackage);

router.route('/:id')
  .get(getPackageById)
  .put(protect, admin, updatePackageValidator, validateRequest, updatePackage)
  .delete(protect, admin, deletePackage);

export default router;
