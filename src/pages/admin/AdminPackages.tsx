import React, { useState } from 'react';
import { usePackages } from '@/hooks/usePackages';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';
import { Package } from '@/types/models';
import toast from 'react-hot-toast';

export default function AdminPackages() {
  const { packages, fetching, create, update, remove } = usePackages();
  const [isEditing, setIsEditing] = useState<Package | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Package>>({});

  if (fetching && !packages.length) return <Loader />;

  const handleSave = async () => {
    if (!formData.name || !formData.base_price) {
      toast.error('Name and price are required');
      return;
    }
    
    // Convert features string back to array if modified as string
    let finalData = { ...formData };
    if (typeof finalData.features === 'string') {
      finalData.features = (finalData.features as string).split(',').map(s => s.trim());
    }

    if (isEditing && isEditing._id) {
      await update(isEditing._id, finalData);
      toast.success('Package updated');
    } else {
      await create(finalData);
      toast.success('Package created');
    }
    setIsEditing(null);
    setIsCreating(false);
    setFormData({});
  };

  const handleEdit = (pkg: Package) => {
    setIsEditing(pkg);
    setFormData({ ...pkg, features: pkg.features.join(', ') as any });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      await remove(id);
      toast.success('Package deleted');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-garamond text-plum">Package Management</h1>
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-plum/60 mt-2">Create and update service packages</p>
        </div>
        <button 
          onClick={() => { setIsCreating(true); setFormData({ is_active: true }); }}
          className="bg-plum text-cream px-6 py-3 font-sans text-xs tracking-[0.2em] uppercase hover:bg-rose transition-colors"
        >
          New Package
        </button>
      </div>

      {(isCreating || isEditing) && (
        <div className="bg-white p-6 mb-8 border border-rose/20">
          <h2 className="font-garamond text-2xl text-plum mb-6">{isEditing ? 'Edit Package' : 'Create Package'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input type="text" placeholder="Package Name" className="border border-rose/30 px-4 py-2 font-sans text-sm focus:outline-none focus:border-rose text-plum" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <input type="number" placeholder="Base Price" className="border border-rose/30 px-4 py-2 font-sans text-sm focus:outline-none focus:border-rose text-plum" value={formData.base_price || ''} onChange={(e) => setFormData({...formData, base_price: Number(e.target.value)})} />
            <input type="text" placeholder="Category" className="border border-rose/30 px-4 py-2 font-sans text-sm focus:outline-none focus:border-rose text-plum" value={formData.category || ''} onChange={(e) => setFormData({...formData, category: e.target.value})} />
            <label className="flex items-center space-x-2 font-sans text-sm text-plum">
              <input type="checkbox" checked={formData.is_active !== false} onChange={(e) => setFormData({...formData, is_active: e.target.checked})} />
              <span>Active</span>
            </label>
          </div>
          <div className="mb-6">
            <textarea placeholder="Description" className="w-full border border-rose/30 px-4 py-2 font-sans text-sm focus:outline-none focus:border-rose text-plum h-24" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>
          <div className="mb-6">
            <input type="text" placeholder="Features (comma separated)" className="w-full border border-rose/30 px-4 py-2 font-sans text-sm focus:outline-none focus:border-rose text-plum" value={formData.features || ''} onChange={(e) => setFormData({...formData, features: e.target.value as any})} />
          </div>
          <div className="flex space-x-4">
            <button onClick={handleSave} className="bg-plum text-cream px-6 py-2 font-sans text-xs tracking-[0.2em] uppercase hover:bg-rose transition-colors">Save</button>
            <button onClick={() => { setIsEditing(null); setIsCreating(false); }} className="border border-plum text-plum px-6 py-2 font-sans text-xs tracking-[0.2em] uppercase hover:bg-rose/10 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {packages.length === 0 && !isCreating ? (
        <EmptyState message="No packages found. Create one to get started." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {packages.map(pkg => (
            <div key={pkg._id} className="bg-white border border-rose/20 p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-garamond text-2xl text-plum">{pkg.name}</h3>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-plum/60 mt-1">{pkg.category} &bull; ${pkg.base_price.toLocaleString()}</p>
                </div>
                <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-semibold ${pkg.is_active ? 'bg-olive/10 text-olive' : 'bg-gray-500/10 text-gray-500'}`}>
                  {pkg.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="font-sans text-sm text-plum/80 mb-6 flex-1">{pkg.description}</p>
              <div className="flex justify-end space-x-4 border-t border-rose/10 pt-4 mt-auto">
                <button onClick={() => handleEdit(pkg)} className="font-sans text-xs tracking-[0.1em] uppercase text-plum hover:text-rose transition-colors">Edit</button>
                <button onClick={() => handleDelete(pkg._id)} className="font-sans text-xs tracking-[0.1em] uppercase text-rose hover:text-plum transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
