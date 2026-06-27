import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as packageService from '../services/package.service';

export const getPackages = asyncHandler(async (req: Request, res: Response) => {
  const packages = await packageService.getAllPackages();
  res.json(packages);
});

export const getPackageById = asyncHandler(async (req: Request, res: Response) => {
  const pkg = await packageService.getPackageById(req.params.id as string);
  if (pkg) res.json(pkg);
  else { res.status(404); throw new Error('Package not found'); }
});

export const createPackage = asyncHandler(async (req: Request, res: Response) => {
  const pkg = await packageService.createPackage(req.body);
  res.status(201).json(pkg);
});

export const updatePackage = asyncHandler(async (req: Request, res: Response) => {
  const pkg = await packageService.updatePackage(req.params.id as string, req.body);
  if (pkg) res.json(pkg);
  else { res.status(404); throw new Error('Package not found'); }
});

export const deletePackage = asyncHandler(async (req: Request, res: Response) => {
  await packageService.deletePackage(req.params.id as string);
  res.json({ message: 'Package removed' });
});
