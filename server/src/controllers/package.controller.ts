import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { packageService } from '../services/package.service';
import { sendSuccess } from '../utils/apiResponse';
import { SuccessCodes } from '../utils/error-codes';

export const getPackages = asyncHandler(async (_req: Request, res: Response) => {
  const packages = await packageService.getActivePackages();
  sendSuccess(res, packages, 'Packages fetched successfully');
});

export const getPackageById = asyncHandler(async (req: Request, res: Response) => {
  const pkg = await packageService.get(req.params.id as string);
  sendSuccess(res, pkg, 'Package fetched successfully');
});

export const createPackage = asyncHandler(async (req: Request, res: Response) => {
  const pkg = await packageService.create(req.body);
  sendSuccess(res, pkg, 'Package created successfully', SuccessCodes.CREATED);
});

export const updatePackage = asyncHandler(async (req: Request, res: Response) => {
  const pkg = await packageService.update(req.params.id as string, req.body);
  sendSuccess(res, pkg, 'Package updated successfully');
});

export const deletePackage = asyncHandler(async (req: Request, res: Response) => {
  await packageService.destroy(req.params.id as string);
  sendSuccess(res, null, 'Package removed successfully');
});
