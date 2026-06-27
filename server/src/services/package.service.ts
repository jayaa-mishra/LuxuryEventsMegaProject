import Package, { IPackage } from '../models/Package';

export const getAllPackages = async (): Promise<IPackage[]> => {
  return await Package.find({ is_active: true });
};

export const getPackageById = async (id: string): Promise<IPackage | null> => {
  return await Package.findById(id);
};

export const createPackage = async (data: Partial<IPackage>): Promise<IPackage> => {
  return await Package.create(data);
};

export const updatePackage = async (id: string, data: Partial<IPackage>): Promise<IPackage | null> => {
  return await Package.findByIdAndUpdate(id, data, { new: true });
};

export const deletePackage = async (id: string): Promise<void> => {
  await Package.findByIdAndDelete(id);
};
