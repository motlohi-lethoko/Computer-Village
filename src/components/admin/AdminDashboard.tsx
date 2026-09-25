import React, { useState } from 'react';
import { 
  X, 
  Laptop, 
  DollarSign, 
  Upload, 
  Trash2, 
  Edit3, 
  Check, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Wrench, 
  Image as ImageIcon, 
  Video, 
  RefreshCw, 
  Download, 
  LogOut,
  Phone,
  MapPin,
  Clock,
  Eye,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product, ProductCategory, RepairBooking } from '../../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddStock: () => void;
  onOpenEditStock: (product: Product) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onOpenAddStock,
  onOpenEditStock
}) => {
  const { 
    products, 
    siteConfig, 
    repairBookings, 
    toggleMarkSold, 
    updateProductPrice, 
    deleteProduct, 
    updateSiteConfig, 
    updateFlyerImage, 
    updateBookingStatus, 
    resetToDefaults, 
    setIsAdmin,
    uploadMediaHelper,
    setSelectedProductForModal,
    showToast
  } = useShop();

  const [activeTab, setActiveTab] = useState<'inventory' | 'flyer' | 'repairs' | 'settings'>('inventory');
  const [adminSearch, setAdminSearch] = useState('');
  const [adminCategory, setAdminCategory] = useState<string>('all');

  // Inline editing state for inventory table
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState('');
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // Flyer editing state
  const [flyerHeadline, setFlyerHeadline] = useState(siteConfig.flyerHeadline);
  const [flyerSubheadline, setFlyerSubheadline] = useState(siteConfig.flyerSubheadline);
  const [bannerNotice, setBannerNotice] = useState(siteConfig.bannerNotice);
  const [phone1, setPhone1] = useState(siteConfig.phones[0] || '+266 57637545');
  const [phone2, setPhone2] = useState(siteConfig.phones[1] || '+266 57402325');
  const [room, setRoom] = useState(siteConfig.room);
  const [landmark, setLandmark] = useState(siteConfig.landmark);
  const [configSaved, setConfigSaved] = useState(false);

  // Flyer image upload
  const [isUploadingFlyer, setIsUploadingFlyer] = useState(false);
  const [flyerUrlInput, setFlyerUrlInput] = useState('');
  const [uploadError, setUploadError] = useState('');

  if (!isOpen) return null;

  // Inventory stats
  const totalStockCount = products.length;
  const inStockCount = products.filter(p => p.status === 'available').length;
  const soldCount = products.filter(p => p.status === 'sold').length;
  const totalValue = products.reduce((acc, curr) => acc + curr.price, 0);

  // Filtered inventory for admin
  const filteredProducts = products.filter(p => {
    if (adminCategory !== 'all' && p.category !== adminCategory) return false;
    if (adminSearch.trim()) {
      const q = adminSearch.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    }
    return true;
  });

  const handleStartPriceEdit = (prod: Product) => {
    setEditingPriceId(prod.id);
    setTempPrice(prod.price.toString());
  };

  const [isSavingConfig, setIsSavingConfig] = useState(false);

  const handleSavePriceEdit = (id: string) => {
    const val = parseFloat(tempPrice);
    if (!isNaN(val) && val >= 0) {
      updateProductPrice(id, val);
      setEditingPriceId(null);
      showToast(`✓ Price updated to M${val.toLocaleString()}`, 'success');
    }
  };

  const handleSaveFlyerAndConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    setTimeout(() => {
      updateSiteConfig({
        flyerHeadline,
        flyerSubheadline,
        bannerNotice,
        phones: [phone1, phone2],
        whatsappNumbers: [phone1.replace(/\D/g, ''), phone2.replace(/\D/g, '')],
        room,
        landmark
      });
      setIsSavingConfig(false);
      setConfigSaved(true);
      showToast('✓ Store flyer & website settings updated', 'success');
      setTimeout(() => setConfigSaved(false), 2500);
    }, 450);
  };

  const handleFlyerFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingFlyer(true);
      setUploadError('');
      const dataUrl = await uploadMediaHelper(file);
      updateFlyerImage(dataUrl);
      showToast('✓ Homepage promotional flyer uploaded', 'success');
    } catch {
      setUploadError('Failed to process image file.');
      showToast('Failed to process image file', 'error');
    } finally {
      setIsUploadingFlyer(false);
    }
  };

  const handleApplyFlyerUrl = () => {
    if (flyerUrlInput.trim()) {
      updateFlyerImage(flyerUrlInput.trim());
      setFlyerUrlInput('');
      showToast('✓ Promotional flyer URL updated', 'success');
    }
  };

  const handleExportData = () => {
    const data = {
      siteConfig,
      products,
      repairBookings,
      storeVideos,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Computer_Village_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('✓ Store inventory & settings backup exported', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-700 text-white shadow-xs">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Computer Village Store Management
                </h2>
                <span className="text-[10px] bg-blue-950 text-blue-300 font-bold px-2 py-0.5 rounded border border-blue-800 uppercase">
                  Staff Portal
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage stock, edit prices, mark sold, update promotional flyer, and review repair jobs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAddStock}
              className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Stock Item</span>
            </button>

            <button
              onClick={() => {
                setIsAdmin(false);
                onClose();
              }}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sign out of admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'inventory'
                ? 'border-blue-700 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Stock & Pricing ({totalStockCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('flyer')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'flyer'
                ? 'border-blue-700 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Homepage Flyer & Notice</span>
          </button>

          <button
            onClick={() => setActiveTab('repairs')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'repairs'
                ? 'border-blue-700 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Repair Orders ({repairBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'videos'
                ? 'border-blue-700 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Store Videos ({storeVideos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'settings'
                ? 'border-blue-700 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Backup & Reset</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
          
          {/* TAB 1: INVENTORY & STOCK */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              
              {/* Quick Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                  <span className="text-xs text-slate-500 font-medium">Total Products</span>
                  <div className="text-2xl font-bold text-slate-900 font-mono mt-1">
                    {totalStockCount}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                  <span className="text-xs text-emerald-600 font-medium">Available in Stock</span>
                  <div className="text-2xl font-bold text-emerald-700 font-mono mt-1">
                    {inStockCount}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                  <span className="text-xs text-red-600 font-medium">Sold Out Items</span>
                  <div className="text-2xl font-bold text-red-700 font-mono mt-1">
                    {soldCount}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
                  <span className="text-xs text-slate-500 font-medium">Stock Catalog Value</span>
                  <div className="text-2xl font-bold text-blue-700 font-mono mt-1 tabular-nums">
                    M{totalValue.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
                <input
                  type="text"
                  placeholder="Filter stock by title, brand, or specs..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="w-full sm:w-80 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={adminCategory}
                    onChange={(e) => setAdminCategory(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-600"
                  >
                    <option value="all">All Categories</option>
                    <option value="laptops">Laptops</option>
                    <option value="desktops">Desktops</option>
                    <option value="chargers">Chargers</option>
                    <option value="batteries">Batteries</option>
                    <option value="printers">Printers</option>
                    <option value="peripherals">Peripherals</option>
                  </select>

                  <button
                    onClick={onOpenAddStock}
                    className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                  >
                    + Add Item
                  </button>
                </div>
              </div>

              {/* Delete confirmation banner */}
              {productToDelete && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-between text-xs text-red-800">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span>Are you sure you want to delete this product from the store catalog?</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const targetProd = products.find(x => x.id === productToDelete);
                        deleteProduct(productToDelete);
                        setProductToDelete(null);
                        showToast(`✓ Removed "${targetProd?.title || 'Product'}" from inventory`, 'info');
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded font-bold hover:bg-red-700 cursor-pointer"
                    >
                      Yes, Delete
                    </button>
                    <button
                      onClick={() => setProductToDelete(null)}
                      className="px-3 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Inventory Table */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="p-3">Product</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Key Specs</th>
                        <th className="p-3">Price (M)</th>
                        <th className="p-3">Stock Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducts.map(p => {
                        const isSold = p.status === 'sold';
                        const isEditingPrice = editingPriceId === p.id;

                        return (
                          <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.image}
                                  alt={p.title}
                                  className="w-12 h-10 object-cover rounded border border-slate-200 shrink-0"
                                />
                                <div>
                                  <span className="font-bold text-slate-900 block">
                                    {p.title}
                                  </span>
                                  <span className="text-[11px] text-slate-500">
                                    {p.brand} · {p.condition}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="p-3 font-semibold text-slate-600 capitalize">
                              {p.category}
                            </td>

                            <td className="p-3 text-slate-500 font-mono text-[11px] max-w-xs truncate">
                              {p.specs.processor && `${p.specs.processor} · `}
                              {p.specs.ram && `${p.specs.ram} · `}
                              {p.specs.storage && `${p.specs.storage}`}
                              {p.specs.voltage && `${p.specs.voltage}`}
                            </td>

                            <td className="p-3 font-mono font-bold text-slate-900">
                              {isEditingPrice ? (
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={tempPrice}
                                    onChange={(e) => setTempPrice(e.target.value)}
                                    className="w-20 bg-white border border-blue-600 rounded px-1.5 py-0.5 text-xs font-mono font-bold"
                                    autoFocus
                                  />
                                  <button
                                    onClick={() => handleSavePriceEdit(p.id)}
                                    className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 cursor-pointer"
                                    title="Save price"
                                  >
                                    <Check className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => setEditingPriceId(null)}
                                    className="p-1 bg-slate-200 text-slate-600 rounded hover:bg-slate-300 cursor-pointer"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <span>M{p.price.toLocaleString()}</span>
                                  <button
                                    onClick={() => handleStartPriceEdit(p)}
                                    className="p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer"
                                    title="Edit price"
                                  >
                                    <Edit3 className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </td>

                            <td className="p-3">
                              <button
                                onClick={() => {
                                  toggleMarkSold(p.id);
                                  showToast(`✓ "${p.title}" marked as ${isSold ? 'Available' : 'Sold'}`, 'info');
                                }}
                                className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                                  isSold
                                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                    : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                }`}
                              >
                                {isSold ? 'Sold (Click to restore)' : 'In Stock (Click to mark sold)'}
                              </button>
                            </td>

                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedProductForModal(p)}
                                  className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-slate-100 rounded cursor-pointer"
                                  title="View details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() => onOpenEditStock(p)}
                                  className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded cursor-pointer"
                                  title="Edit full product details"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() => setProductToDelete(p.id)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded cursor-pointer"
                                  title="Delete item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: FLYER & WEBSITE CUSTOMIZER */}
          {activeTab === 'flyer' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Homepage Promotional Flyer & Store Notices
                </h3>
                <p className="text-xs text-slate-600">
                  Update the promotional flyer image displayed on the home page hero, adjust phone numbers, and change promotional announcements.
                </p>
              </div>

              {configSaved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Store notice and website details saved successfully!</span>
                </div>
              )}

              {uploadError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Flyer Image Replacement */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Homepage Flyer Image
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                  <div className="sm:col-span-4 aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                    <img
                      src={siteConfig.flyerImageUrl}
                      alt="Current Flyer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="sm:col-span-8 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Upload New Flyer Image (from phone or computer)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFlyerFileUpload}
                        disabled={isUploadingFlyer}
                        className="block w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                      />
                      {isUploadingFlyer && (
                        <p className="text-xs text-blue-700 mt-1">Processing and saving image...</p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Or Paste Image URL:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={flyerUrlInput}
                          onChange={(e) => setFlyerUrlInput(e.target.value)}
                          placeholder="https://example.com/new-flyer.jpg"
                          className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                        <button
                          type="button"
                          onClick={handleApplyFlyerUrl}
                          className="px-3 py-1.5 bg-blue-700 text-white rounded-lg text-xs font-bold hover:bg-blue-800 cursor-pointer"
                        >
                          Apply URL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text & Store Settings Form */}
              <form onSubmit={handleSaveFlyerAndConfig} className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Store Contact & Notice Settings
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Announcement Banner Notice
                  </label>
                  <input
                    type="text"
                    value={bannerNotice}
                    onChange={(e) => setBannerNotice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Primary Phone Number
                    </label>
                    <input
                      type="text"
                      value={phone1}
                      onChange={(e) => setPhone1(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Secondary Phone Number
                    </label>
                    <input
                      type="text"
                      value={phone2}
                      onChange={(e) => setPhone2(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Shop Room Number
                    </label>
                    <input
                      type="text"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Landmark / Directions
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSavingConfig}
                  className={`px-5 py-2.5 rounded-lg text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                    configSaved
                      ? 'bg-emerald-600 shadow-emerald-600/25'
                      : 'bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-sky-600/20 active:scale-[0.98]'
                  }`}
                >
                  {isSavingConfig ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Saving Website Settings...</span>
                    </>
                  ) : configSaved ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>✓ Settings Saved Successfully!</span>
                    </>
                  ) : (
                    <span>Save Website Settings</span>
                  )}
                </button>
              </form>

            </div>
          )}

          {/* TAB 3: REPAIR ORDERS */}
          {activeTab === 'repairs' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Customer Repair Assessment Tickets
                </h3>
                <p className="text-xs text-slate-600">
                  Track client devices booked through the website. Update ticket status as diagnostics and repairs progress.
                </p>
              </div>

              {repairBookings.length > 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                        <tr>
                          <th className="p-3">Ticket ID</th>
                          <th className="p-3">Customer</th>
                          <th className="p-3">Device & Issue</th>
                          <th className="p-3">Date & Urgency</th>
                          <th className="p-3">Job Status</th>
                          <th className="p-3 text-right">WhatsApp Client</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {repairBookings.map(b => (
                          <tr key={b.id} className="hover:bg-slate-50">
                            <td className="p-3 font-mono font-bold text-slate-900">
                              {b.id}
                            </td>
                            <td className="p-3">
                              <span className="font-bold text-slate-900 block">{b.customerName}</span>
                              <span className="text-slate-500 font-mono text-[11px]">{b.phone}</span>
                            </td>
                            <td className="p-3 max-w-xs">
                              <span className="font-semibold text-slate-800 block">{b.deviceType} - {b.model}</span>
                              <span className="text-slate-600 text-[11px]">{b.issueDescription}</span>
                            </td>
                            <td className="p-3">
                              <span className="text-slate-700 block">{b.createdAt}</span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                b.urgency === 'Urgent (Same Day)' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {b.urgency}
                              </span>
                            </td>
                            <td className="p-3">
                              <select
                                value={b.status}
                                onChange={(e) => {
                                  const newStatus = e.target.value as RepairBooking['status'];
                                  updateBookingStatus(b.id, newStatus);
                                  showToast(`✓ Ticket ${b.id} status changed to ${newStatus}`, 'success');
                                }}
                                className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
                              >
                                <option value="Received">Received / Pending</option>
                                <option value="Diagnosing">In Diagnosis</option>
                                <option value="In Repair">In Repair</option>
                                <option value="Ready for Pickup">Ready for Pickup</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </td>
                            <td className="p-3 text-right">
                              <a
                                href={`https://wa.me/${b.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${b.customerName}, regarding your repair ticket ${b.id} at Computer Village: `)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors inline-block"
                              >
                                Chat Client
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-xs text-slate-500">
                  No repair bookings submitted yet. Customers can book diagnostics via the Repair Desk section.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: STORE VIDEOS */}
          {activeTab === 'videos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Store Tour & Stock Videos
                  </h3>
                  <p className="text-xs text-slate-600">
                    Upload new store floor videos or technician workbench walkthroughs.
                  </p>
                </div>

                <button
                  onClick={onOpenVideoUpload}
                  className="px-3.5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  + Upload Video
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {storeVideos.map(vid => (
                  <div key={vid.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                    <div className="aspect-video bg-black rounded-lg overflow-hidden border border-slate-200">
                      <video src={vid.videoUrl} controls className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{vid.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{vid.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BACKUP & RESTORE */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Store Data Backup & Factory Reset
                </h3>
                <p className="text-xs text-slate-600">
                  Export all inventory and configurations to a file, or reset to original factory data.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Export Store Catalog</h4>
                  <p className="text-xs text-slate-600">
                    Save a complete backup of all products, prices, and settings.
                  </p>
                  <button
                    onClick={handleExportData}
                    className="px-4 py-2 rounded-lg bg-blue-700 text-white text-xs font-bold hover:bg-blue-800 flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <h4 className="text-xs font-bold text-red-600 uppercase">Restore Default Store Seed Data</h4>
                  <p className="text-xs text-slate-600">
                    Reset products, pricing, and services back to original defaults.
                  </p>
                  <button
                    onClick={() => {
                      resetToDefaults();
                      onClose();
                    }}
                    className="px-4 py-2 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-bold hover:bg-red-100 flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset All Data to Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
