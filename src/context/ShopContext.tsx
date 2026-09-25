import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_PRODUCTS, INITIAL_REPAIR_SERVICES, INITIAL_SITE_CONFIG, INITIAL_VIDEOS } from '../data/initialData';
import { Product, RepairBooking, RepairService, SiteConfig, StoreVideo } from '../types';
import { storeMediaFile } from '../utils/mediaStorage';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ShopContextType {
  products: Product[];
  siteConfig: SiteConfig;
  repairServices: RepairService[];
  storeVideos: StoreVideo[];
  repairBookings: RepairBooking[];
  isAdmin: boolean;
  adminModalOpen: boolean;
  selectedProductForModal: Product | null;
  flyerLightboxOpen: boolean;
  activeCategory: string;
  searchQuery: string;
  brandFilter: string;
  statusFilter: 'all' | 'available' | 'sold';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';

  // State Setters
  setIsAdmin: (val: boolean) => void;
  setAdminModalOpen: (val: boolean) => void;
  setSelectedProductForModal: (p: Product | null) => void;
  setFlyerLightboxOpen: (val: boolean) => void;
  setActiveCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  setBrandFilter: (brand: string) => void;
  setStatusFilter: (status: 'all' | 'available' | 'sold') => void;
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'newest') => void;

  // Product Actions
  addProduct: (product: Omit<Product, 'id' | 'dateAdded'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleMarkSold: (id: string) => void;
  updateProductPrice: (id: string, newPrice: number) => void;

  // Video Actions
  addStoreVideo: (video: Omit<StoreVideo, 'id' | 'dateAdded'>) => void;
  deleteStoreVideo: (id: string) => void;

  // Site Config Actions
  updateSiteConfig: (updates: Partial<SiteConfig>) => void;
  updateFlyerImage: (imageUrl: string) => void;

  // Repair Booking Actions
  createRepairBooking: (booking: Omit<RepairBooking, 'id' | 'createdAt' | 'status'>) => string;
  updateBookingStatus: (id: string, status: RepairBooking['status'], estimatedCost?: number) => void;

  // Utilities & Feedback
  resetToDefaults: () => void;
  uploadMediaHelper: (file: File) => Promise<string>;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const LOCAL_STORAGE_PRODUCTS = 'cv_products_v1';
const LOCAL_STORAGE_CONFIG = 'cv_config_v2';
const LOCAL_STORAGE_VIDEOS = 'cv_videos_v1';
const LOCAL_STORAGE_BOOKINGS = 'cv_bookings_v1';
const LOCAL_STORAGE_ADMIN_AUTH = 'cv_admin_auth_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CONFIG) || localStorage.getItem('cv_config_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.flyerImageUrl || parsed.flyerImageUrl.includes('1790265181051')) {
          parsed.flyerImageUrl = INITIAL_SITE_CONFIG.flyerImageUrl;
        }
        return { ...INITIAL_SITE_CONFIG, ...parsed, flyerImageUrl: parsed.flyerImageUrl || INITIAL_SITE_CONFIG.flyerImageUrl };
      }
      return INITIAL_SITE_CONFIG;
    } catch {
      return INITIAL_SITE_CONFIG;
    }
  });

  const [storeVideos, setStoreVideos] = useState<StoreVideo[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_VIDEOS);
      return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
    } catch {
      return INITIAL_VIDEOS;
    }
  });

  const [repairBookings, setRepairBookings] = useState<RepairBooking[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BOOKINGS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [flyerLightboxOpen, setFlyerLightboxOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'sold'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS, JSON.stringify(products));
    } catch (err) {
      console.warn('Unable to persist products to localStorage', err);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CONFIG, JSON.stringify(siteConfig));
    } catch (err) {
      console.warn('Unable to persist site config', err);
    }
  }, [siteConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_VIDEOS, JSON.stringify(storeVideos));
    } catch (err) {
      console.warn('Unable to persist videos', err);
    }
  }, [storeVideos]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS, JSON.stringify(repairBookings));
    } catch (err) {
      console.warn('Unable to persist bookings', err);
    }
  }, [repairBookings]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ADMIN_AUTH, isAdmin ? 'true' : 'false');
    } catch (err) {
      // ignore
    }
  }, [isAdmin]);

  const addProduct = (newProdData: Omit<Product, 'id' | 'dateAdded'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    if (selectedProductForModal && selectedProductForModal.id === id) {
      setSelectedProductForModal(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (selectedProductForModal?.id === id) {
      setSelectedProductForModal(null);
    }
  };

  const toggleMarkSold = (id: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const newStatus = p.status === 'sold' ? 'available' : 'sold';
          return { ...p, status: newStatus };
        }
        return p;
      })
    );
  };

  const updateProductPrice = (id: string, newPrice: number) => {
    if (isNaN(newPrice) || newPrice < 0) return;
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, price: newPrice } : p))
    );
  };

  const addStoreVideo = (videoData: Omit<StoreVideo, 'id' | 'dateAdded'>) => {
    const newVideo: StoreVideo = {
      ...videoData,
      id: `vid-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setStoreVideos(prev => [newVideo, ...prev]);
  };

  const deleteStoreVideo = (id: string) => {
    setStoreVideos(prev => prev.filter(v => v.id !== id));
  };

  const updateSiteConfig = (updates: Partial<SiteConfig>) => {
    setSiteConfig(prev => ({ ...prev, ...updates }));
  };

  const updateFlyerImage = (imageUrl: string) => {
    setSiteConfig(prev => ({ ...prev, flyerImageUrl: imageUrl }));
  };

  const createRepairBooking = (bookingData: Omit<RepairBooking, 'id' | 'createdAt' | 'status'>) => {
    const id = `REP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: RepairBooking = {
      ...bookingData,
      id,
      createdAt: new Date().toISOString(),
      status: 'Received'
    };
    setRepairBookings(prev => [newBooking, ...prev]);
    return id;
  };

  const updateBookingStatus = (id: string, status: RepairBooking['status'], estimatedCost?: number) => {
    setRepairBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status, ...(estimatedCost !== undefined ? { estimatedCost } : {}) } : b))
    );
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setSiteConfig(INITIAL_SITE_CONFIG);
    setStoreVideos(INITIAL_VIDEOS);
    setRepairBookings([]);
    localStorage.removeItem(LOCAL_STORAGE_PRODUCTS);
    localStorage.removeItem(LOCAL_STORAGE_CONFIG);
    localStorage.removeItem(LOCAL_STORAGE_VIDEOS);
    localStorage.removeItem(LOCAL_STORAGE_BOOKINGS);
  };

  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastItem = { id, message, type };
    setToasts(prev => [...prev.slice(-3), newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const uploadMediaHelper = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const dataUrl = reader.result as string;
          const mediaId = `media-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
          const isVideo = file.type.startsWith('video');
          await storeMediaFile(mediaId, dataUrl, isVideo ? 'video' : 'image', file.name);
          resolve(dataUrl);
        } catch (err) {
          resolve(reader.result as string);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        siteConfig,
        repairServices: INITIAL_REPAIR_SERVICES,
        storeVideos,
        repairBookings,
        isAdmin,
        adminModalOpen,
        selectedProductForModal,
        flyerLightboxOpen,
        activeCategory,
        searchQuery,
        brandFilter,
        statusFilter,
        sortBy,
        setIsAdmin,
        setAdminModalOpen,
        setSelectedProductForModal,
        setFlyerLightboxOpen,
        setActiveCategory,
        setSearchQuery,
        setBrandFilter,
        setStatusFilter,
        setSortBy,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleMarkSold,
        updateProductPrice,
        addStoreVideo,
        deleteStoreVideo,
        updateSiteConfig,
        updateFlyerImage,
        createRepairBooking,
        updateBookingStatus,
        resetToDefaults,
        uploadMediaHelper,
        showToast
      }}
    >
      {children}

      {/* Floating Toast Notification Feedback Container with Sky Theme */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 ${
              toast.type === 'error'
                ? 'bg-rose-950/95 text-rose-50 border-rose-700 shadow-rose-950/30'
                : toast.type === 'info'
                ? 'bg-slate-900/95 text-white border-sky-500 shadow-sky-950/30'
                : 'bg-slate-900/95 text-white border-sky-500/80 shadow-sky-950/30 ring-1 ring-sky-500/20'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              ) : toast.type === 'info' ? (
                <Info className="w-4 h-4 text-sky-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              )}
              <span className="text-xs font-semibold leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
