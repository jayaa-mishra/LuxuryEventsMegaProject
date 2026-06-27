import React, { useState } from 'react';
import { useGallery } from '@/hooks/useGallery';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';
import toast from 'react-hot-toast';

export default function AdminGallery() {
  const { galleries, fetching, create, remove, upload } = useGallery();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<any>({ images: [] });
  const [uploading, setUploading] = useState(false);

  if (fetching && !galleries.length) return <Loader />;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      const file = e.target.files[0];
      const result = await upload(file);
      if (result) {
        setFormData({
          ...formData,
          images: [...(formData.images || []), { url: result.url, public_id: result.public_id, is_primary: formData.images?.length === 0 }]
        });
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Failed to upload image');
      }
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.category) {
      toast.error('Title and category are required');
      return;
    }
    await create(formData);
    toast.success('Gallery created');
    setIsCreating(false);
    setFormData({ images: [] });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this gallery?')) {
      await remove(id);
      toast.success('Gallery deleted');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-garamond text-plum">Gallery Management</h1>
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-plum/60 mt-2">Manage portfolio images</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-plum text-cream px-6 py-3 font-sans text-xs tracking-[0.2em] uppercase hover:bg-rose transition-colors"
        >
          New Gallery
        </button>
      </div>

      {isCreating && (
        <div className="bg-white p-6 mb-8 border border-rose/20">
          <h2 className="font-garamond text-2xl text-plum mb-6">Create Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input type="text" placeholder="Gallery Title" className="border border-rose/30 px-4 py-2 font-sans text-sm focus:outline-none focus:border-rose text-plum" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            <input type="text" placeholder="Category (e.g. Weddings)" className="border border-rose/30 px-4 py-2 font-sans text-sm focus:outline-none focus:border-rose text-plum" value={formData.category || ''} onChange={(e) => setFormData({...formData, category: e.target.value})} />
          </div>
          <div className="mb-6">
            <textarea placeholder="Description" className="w-full border border-rose/30 px-4 py-2 font-sans text-sm focus:outline-none focus:border-rose text-plum h-24" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>
          
          {/* Image Uploader */}
          <div className="mb-6 p-4 border border-dashed border-rose/50 bg-blush">
            <h3 className="font-sans text-[11px] tracking-[0.2em] uppercase text-plum font-semibold mb-4">Upload Images</h3>
            <input type="file" accept="image/*" onChange={handleFileSelect} disabled={uploading} className="mb-4 text-sm" />
            {uploading && <p className="text-xs text-rose mb-4">Uploading to Cloudinary...</p>}
            
            {formData.images?.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {formData.images.map((img: any, i: number) => (
                  <div key={i} className="relative aspect-square bg-rose/10">
                    <img src={img.url} alt="Upload preview" className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <button onClick={handleSave} className="bg-plum text-cream px-6 py-2 font-sans text-xs tracking-[0.2em] uppercase hover:bg-rose transition-colors">Save Gallery</button>
            <button onClick={() => { setIsCreating(false); setFormData({ images: [] }); }} className="border border-plum text-plum px-6 py-2 font-sans text-xs tracking-[0.2em] uppercase hover:bg-rose/10 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {galleries.length === 0 && !isCreating ? (
        <EmptyState 
          message="No galleries found." 
          subMessage="Upload event photos to build the portfolio."
          imageSrc="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1500&auto=format&fit=crop"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map(gallery => (
            <div key={gallery._id} className="bg-white border border-rose/20 flex flex-col">
              <div className="relative aspect-[4/3] bg-blush overflow-hidden">
                {gallery.images && gallery.images.length > 0 ? (
                  <img src={gallery.images[0].url} alt={gallery.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-plum/30">No Image</div>
                )}
                <div className="absolute top-2 right-2 bg-white px-2 py-1 text-[10px] tracking-widest uppercase font-bold text-plum">{gallery.images.length} Photos</div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-garamond text-2xl text-plum mb-1">{gallery.title}</h3>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-rose mb-4">{gallery.category}</p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-rose/10">
                  <span className="font-sans text-xs text-plum/60">{new Date(gallery.createdAt || '').toLocaleDateString()}</span>
                  <button onClick={() => handleDelete(gallery._id)} className="font-sans text-[10px] tracking-[0.2em] uppercase text-rose hover:text-plum transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
