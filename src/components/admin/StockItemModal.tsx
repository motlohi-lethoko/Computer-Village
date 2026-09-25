import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  Laptop, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product, ProductCategory, ProductStatus } from '../../types';

interface StockItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

export const StockItemModal: React.FC<StockItemModalProps> = ({ 
  isOpen, 
  onClose, 
  productToEdit 
}) => {
  const { addProduct, updateProduct, uploadMediaHelper, showToast } = useShop();

  const isEditing = Boolean(productToEdit);

  // Form State
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('Dell');
  const [category, setCategory] = useState<ProductCategory>('laptops');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [condition, setCondition] = useState<'Brand New' | 'Refurbished Grade A' | 'Certified Pre-Owned'>('Refurbished Grade A');
  const [status, setStatus] = useState<ProductStatus>('available');
  const [featured, setFeatured] = useState(false);
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Specs
  const [processor, setProcessor] = useState('');
  const [ram, setRam] = useState('');
  const [storage, setStorage] = useState('');
  const [os, setOs] = useState('Windows 11 Pro');
  const [screenSize, setScreenSize] = useState('15.6 inch');
  const [warranty, setWarranty] = useState('6 Months Warranty');
  const [voltage, setVoltage] = useState('');
  const [tipType, setTipType] = useState('');

  // Media
  const [image, setImage] = useState('/assets/images/laptops_showcase_row_1790265301779.jpg');
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill form when editing
  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setBrand(productToEdit.brand);
      setCategory(productToEdit.category);
      setPrice(productToEdit.price.toString());
      setOriginalPrice(productToEdit.originalPrice ? productToEdit.originalPrice.toString() : '');
      setCondition(productToEdit.condition);
      setStatus(productToEdit.status);
      setFeatured(Boolean(productToEdit.featured));
      setDescription(productToEdit.description);

      setProcessor(productToEdit.specs.processor || '');
      setRam(productToEdit.specs.ram || '');
      setStorage(productToEdit.specs.storage || '');
      setOs(productToEdit.specs.os || 'Windows 11 Pro');
      setScreenSize(productToEdit.specs.screenSize || '');
      setWarranty(productToEdit.specs.warranty || '6 Months Warranty');
      setVoltage(productToEdit.specs.voltage || '');
      setTipType(productToEdit.specs.tipType || '');

      setImage(productToEdit.image);
    } else {
      // Reset defaults
      setTitle('');
      setBrand('Dell');
      setCategory('laptops');
      setPrice('');
      setOriginalPrice('');
      setCondition('Refurbished Grade A');
      setStatus('available');
      setFeatured(false);
      setDescription('');
      setProcessor('Intel Core i5');
      setRam('8GB RAM');
      setStorage('256GB SSD');
      setOs('Windows 11 Pro');
      setScreenSize('15.6 inch');
      setWarranty('6 Months Warranty');
      setVoltage('');
      setTipType('');
      setImage('/assets/images/laptops_showcase_row_1790265301779.jpg');
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  // Image File Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingMedia(true);
      setErrorMessage('');
      setUploadMessage('Processing image...');
      const dataUrl = await uploadMediaHelper(file);
      setImage(dataUrl);
      setUploadMessage('Image uploaded successfully!');
      setTimeout(() => setUploadMessage(''), 2500);
    } catch {
      setErrorMessage('Failed to upload image. Please try another image file.');
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMessage('Please enter a valid price in Maloti.');
      return;
    }

    const parsedOrig = originalPrice ? parseFloat(originalPrice) : undefined;

    const payload = {
      title: title.trim(),
      brand: brand.trim(),
      category,
      price: parsedPrice,
      originalPrice: parsedOrig,
      condition,
      status,
      featured,
      specs: {
        processor: processor.trim() || undefined,
        ram: ram.trim() || undefined,
        storage: storage.trim() || undefined,
        os: os.trim() || undefined,
        screenSize: screenSize.trim() || undefined,
        warranty: warranty.trim() || undefined,
        voltage: voltage.trim() || undefined,
        tipType: tipType.trim() || undefined
      },
      image,
      description: description.trim() || `${brand} ${category} in ${condition} condition. Tested and certified at Computer Village Room 104A.`
    };

    setIsSaving(true);
    setTimeout(() => {
      if (isEditing && productToEdit) {
        updateProduct(productToEdit.id, payload);
        showToast(`✓ Updated "${payload.title}" in stock`, 'success');
      } else {
        addProduct(payload);
        showToast(`✓ Added "${payload.title}" to stock catalog`, 'success');
      }
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 500);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isEditing ? `Edit Stock Item: ${productToEdit?.title}` : 'Add New Inventory Item'}
              </h3>
              <p className="text-xs text-slate-500">
                Update prices, specs, photos, video demos, and stock availability
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
          
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {uploadMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadMessage}</span>
            </div>
          )}

          {/* Basic Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              1. General Details
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Item Title *
              </label>
              <input
                type="text"
                required
                placeholder="Lenovo Ryzen 7 High Performance / Dell Latitude Core i5"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brand *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Dell, HP, Lenovo, ASUS"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="laptops">Laptops</option>
                  <option value="desktops">Desktop PC Towers</option>
                  <option value="chargers">Laptop Chargers</option>
                  <option value="batteries">Laptop Batteries</option>
                  <option value="printers">Printers & Scanners</option>
                  <option value="peripherals">Peripherals & Screens</option>
                  <option value="networking">Routers & Networking</option>
                  <option value="repairs">Repairs & Diagnostics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Condition *
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="Refurbished Grade A">Refurbished Grade A</option>
                  <option value="Brand New">Brand New (Sealed Box)</option>
                  <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                </select>
              </div>
            </div>

            {/* Pricing & Stock Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Selling Price (Maloti M) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                    M
                  </span>
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="6500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-7 pr-3 py-2 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Original / Strikethrough Price (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    M
                  </span>
                  <input
                    type="number"
                    step="any"
                    placeholder="7200"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-7 pr-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Stock Status *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ProductStatus)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                >
                  <option value="available">In Stock (Available)</option>
                  <option value="sold">Sold Out (Marked Sold)</option>
                  <option value="low_stock">Low Stock Warning</option>
                </select>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              2. Hardware Specifications
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Processor (CPU)
                </label>
                <input
                  type="text"
                  placeholder="Intel Core i5 8th Gen / Ryzen 7"
                  value={processor}
                  onChange={(e) => setProcessor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Memory (RAM)
                </label>
                <input
                  type="text"
                  placeholder="8GB RAM / 16GB DDR4"
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Storage (SSD/HDD)
                </label>
                <input
                  type="text"
                  placeholder="256GB NVMe SSD / 512GB SSD"
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Operating System
                </label>
                <input
                  type="text"
                  placeholder="Windows 11 Pro / Windows 10"
                  value={os}
                  onChange={(e) => setOs(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Screen Size
                </label>
                <input
                  type="text"
                  placeholder="14 inch FHD / 15.6 inch"
                  value={screenSize}
                  onChange={(e) => setScreenSize(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Warranty Period
                </label>
                <input
                  type="text"
                  placeholder="6 Months Warranty"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Voltage / Wattage (Chargers)
                </label>
                <input
                  type="text"
                  placeholder="65W 19.5V 3.34A"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tip / Connector Type
                </label>
                <input
                  type="text"
                  placeholder="4.5mm Blue Pin / USB-C"
                  value={tipType}
                  onChange={(e) => setTipType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Photos & Video Demonstration Upload */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              3. Product Photos & Video Demo
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Product Photo */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <span className="text-xs font-semibold text-slate-700 block">
                  Product Image
                </span>
                
                <div className="aspect-[4/3] bg-white rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Upload Photo from device:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploadingMedia}
                    className="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Or paste image URL:</label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Product Video Demo */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <span className="text-xs font-semibold text-slate-700 block">
                  Video Demonstration (Optional)
                </span>

                <div className="aspect-[4/3] bg-white rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center">
                  {videoUrl ? (
                    <video src={videoUrl} controls className="w-full h-full object-contain" />
                  ) : (
                    <div className="text-center p-4 text-slate-400 space-y-1">
                      <Video className="w-8 h-8 mx-auto text-slate-300" />
                      <p className="text-[11px]">No video attached yet</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Upload Video clip (MP4 / WebM):</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    disabled={isUploadingMedia}
                    className="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Or paste video URL:</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 pt-4 border-t border-slate-200">
            <label className="block text-xs font-semibold text-slate-700">
              Product Description / Sales Notes
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ultra-fast boot times, pristine condition, full numeric keypad, includes original power adapter..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Footer Submit Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploadingMedia || isSaving}
              className={`px-6 py-2.5 rounded-lg text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                saveSuccess
                  ? 'bg-emerald-600 shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-sky-600/25 active:scale-[0.98]'
              } ${isSaving ? 'opacity-90 cursor-wait' : ''}`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>{isEditing ? 'Saving Changes...' : 'Adding to Inventory...'}</span>
                </>
              ) : saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>✓ Saved Successfully!</span>
                </>
              ) : (
                <span>{isEditing ? 'Save Changes' : 'Add Item to Inventory'}</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
